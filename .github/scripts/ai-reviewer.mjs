import { GoogleGenAI } from '@google/genai';
import * as github from '@actions/github';

const BOT_TAG = '<!-- gemini-code-reviewer-bot -->';

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!token) {
    console.error('Error: GITHUB_TOKEN is not set.');
    process.exit(1);
  }

  if (!geminiApiKey) {
    console.error('Error: GEMINI_API_KEY secret is not set.');
    process.exit(1);
  }

  const octokit = github.getOctokit(token);
  const context = github.context;
  const { owner, repo, number: pull_number } = context.issue;

  // 1. Fetch the unified diff from the Pull Request
  const { data: diff } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: { format: 'diff' },
  });

  const { data: listComments } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number: pull_number,
  });

  // 2. Guard rail: Skip reviews for huge auto-generated diffs
  if (!diff || diff.length === 0) {
    console.log('No diff found.');
    return;
  }

  if (diff.length > 50000) {
    console.log('Diff exceeds 50k characters. Skipping AI review to conserve token quota.');
    return;
  }

  // 3. Initialize Gemini
  let commentBody = '';
  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });
    const prompt = `
  You are a Staff DevOps and Software Engineer reviewing a Pull Request.
  Analyze the following git diff and provide concise, constructive feedback:
  - Highlight logical bugs, security vulnerabilities, edge cases, or performance bottlenecks.
  - Suggest clean code improvements with markdown code blocks where relevant.
  - Do not nitpick trivial formatting unless it breaks execution.
  
  PR Diff:
  \`\`\`diff
  ${diff}
  \`\`\`
  `;

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
    });
    commentBody = `${BOT_TAG}\n### 🤖 Gemini Code Review\n\n${response.text}\n\n---\n*Automated review by Gemini CI*`;
  } catch (error) {
    console.error('Error generating review with Gemini:', error);
    process.exit(1);
  } 
    
  // 4. Post comment to Pull Request
  const findBotComment = (comments) => comments.find(c => c.body?.includes(BOT_TAG));

  const existingComment = findBotComment(listComments);

  const action = existingComment 
    ? octokit.rest.issues.updateComment({ ...params, comment_id: existingComment.id })
    : octokit.rest.issues.createComment({ ...params });

  await action;

  console.log('Successfully posted review comment.');
}

run().catch((error) => {
  console.error('Review workflow failed:', error);
  process.exit(1);
});