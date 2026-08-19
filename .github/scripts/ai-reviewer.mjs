import { GoogleGenAI } from '@google/genai';
import * as github from '@actions/github';

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const geminiApiKey = process.env.GEMINI_API_KEY;

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

  const commentBody = `### 🤖 Gemini Code Review\n\n${response.text}\n\n---\n*Automated review by Gemini CI*`;

  // 4. Post comment to Pull Request
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body: commentBody,
  });

  console.log('Successfully posted review comment.');
}

run().catch((error) => {
  console.error('Review workflow failed:', error);
  process.exit(1);
});