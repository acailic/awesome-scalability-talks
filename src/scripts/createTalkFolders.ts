import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface TalkLink {
  title: string;
  url: string;
  speaker: string;
  company: string;
}

function parseLink(line: string): TalkLink | null {
  const match = line.match(
    /\[(.*?)\s*-\s*(.*?),\s*(.*?)\s*at\s*(.*?)\]\((.*?)\)/
  );
  if (!match) return null;

  return {
    title: match[1].trim(),
    speaker: match[2].trim(),
    company: match[3].trim(),
    url: match[5].trim(),
  };
}

async function createTalkFolder(talk: TalkLink) {
  // Create folder name from title
  const folderName = talk.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const folderPath = path.join("sources", "talks", folderName);
  const filePath = path.join(folderPath, `${folderName}.md`);

  // Create folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Create markdown file with basic structure
  const content = `# ${talk.title}

Speaker: ${talk.speaker}
Company: ${talk.company}
URL: ${talk.url}

## Summary

[Add summary here]

## Key Points

1.
2.
3.

## Transcript

[Add transcript here]

## Notes

[Add any additional notes here]
`;

  fs.writeFileSync(filePath, content);
  console.log(`Created folder and file for: ${talk.title}`);
}

async function main() {
  const ytLinksPath = path.join("sources", "yt-links.md");
  const content = fs.readFileSync(ytLinksPath, "utf-8");

  const lines = content.split("\n");
  const talks: TalkLink[] = [];

  for (const line of lines) {
    if (line.startsWith("* [")) {
      const talk = parseLink(line);
      if (talk) {
        talks.push(talk);
      }
    }
  }

  for (const talk of talks) {
    await createTalkFolder(talk);
  }
}

main().catch(console.error);
