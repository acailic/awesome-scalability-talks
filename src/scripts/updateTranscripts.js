import fs from "fs";
import path from "path";
import { YoutubeTranscript } from "youtube-transcript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

async function updateTranscript(filePath, url) {
  try {
    const videoId = extractYoutubeId(url);
    if (!videoId) {
      console.log(`Not a YouTube URL: ${url}`);
      return;
    }

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcript) {
      console.log(`No transcript available for: ${path.basename(filePath)}`);
      return;
    }

    // Format transcript text
    const transcriptText = transcript.map((item) => item.text).join(" ");

    // Read the existing content
    let content = fs.readFileSync(filePath, "utf-8");

    // Replace the transcript section
    content = content.replace(
      /## Transcript\n\n\[Add transcript here\]/,
      `## Transcript\n\n${transcriptText}`
    );

    // Write back the updated content
    fs.writeFileSync(filePath, content);
    console.log(`Updated transcript for: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error updating transcript for ${url}:`, error.message);
  }
}

async function processAllTalks() {
  const talksDir = path.join("sources", "talks");
  const folders = fs.readdirSync(talksDir);

  for (const folder of folders) {
    const folderPath = path.join(talksDir, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        // Extract URL from the content
        const urlMatch = content.match(/URL: (.*)/);
        if (urlMatch) {
          const url = urlMatch[1];
          await updateTranscript(filePath, url);
        }
      }
    }
  }
}

// Run the script
processAllTalks().catch(console.error);
