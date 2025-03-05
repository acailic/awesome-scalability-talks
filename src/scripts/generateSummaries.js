import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanText(text) {
  // Remove HTML entities
  text = text
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .replace(/&amp;lt;/g, "<")
    .replace(/&amp;gt;/g, ">")
    .replace(/&amp;amp;/g, "&");

  // Remove filler words and clean up
  text = text
    .replace(
      /\b(um|uh|like|you know|kind of|sort of|basically|actually|pretty much|all right|okay|so|now|let's|let us)\b/gi,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();

  return text;
}

function extractKeyPoints(transcript) {
  // Split into sentences and clean them
  const sentences = transcript.split(/[.!?]+/).map((s) => cleanText(s.trim()));
  console.log("Found sentences:", sentences.length);

  // Filter for meaningful sentences (longer than 20 words)
  const meaningfulSentences = sentences.filter(
    (s) =>
      s.split(/\s+/).length > 20 &&
      !s.toLowerCase().includes("um") &&
      !s.toLowerCase().includes("uh") &&
      !s.toLowerCase().includes("like") &&
      !s.toLowerCase().includes("you know")
  );
  console.log("Found meaningful sentences:", meaningfulSentences.length);

  // Take top 5 key points
  return meaningfulSentences.slice(0, 5);
}

function generateSummary(transcript) {
  // Clean the transcript first
  transcript = cleanText(transcript);

  // Split into sentences and clean them
  const sentences = transcript.split(/[.!?]+/).map((s) => cleanText(s.trim()));
  console.log("Found sentences for summary:", sentences.length);

  // Filter for meaningful sentences (longer than 15 words)
  const meaningfulSentences = sentences.filter(
    (s) =>
      s.split(/\s+/).length > 15 &&
      !s.toLowerCase().includes("um") &&
      !s.toLowerCase().includes("uh") &&
      !s.toLowerCase().includes("like") &&
      !s.toLowerCase().includes("you know")
  );
  console.log(
    "Found meaningful sentences for summary:",
    meaningfulSentences.length
  );

  // Take first 3 meaningful sentences for summary
  return meaningfulSentences.slice(0, 3).join(". ") + ".";
}

function processTalks() {
  const talksDir = path.join(__dirname, "../../sources/talks");
  const talksJsonPath = path.join(__dirname, "../../src/talks/talks.json");

  // Read talks.json
  let talksJson = {};
  try {
    talksJson = JSON.parse(fs.readFileSync(talksJsonPath, "utf8"));
  } catch (err) {
    console.error("Error reading talks.json:", err);
    return;
  }

  // Get list of markdown files
  const files = fs
    .readdirSync(talksDir)
    .filter((file) => file.endsWith(".md"))
    .slice(0, 10); // Process first 10 files

  for (const file of files) {
    console.log(`\nProcessing ${file}...`);
    const filePath = path.join(talksDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Extract transcript section - updated regex to handle more cases
    const transcriptMatch = content.match(
      /## Transcript\n\n([\s\S]*?)(?=\n##|$)/
    );
    if (!transcriptMatch) {
      console.log(`No transcript found in ${file}`);
      continue;
    }

    const transcript = transcriptMatch[1].trim();
    console.log("Transcript length:", transcript.length);

    const folderName = file.replace(".md", "");
    const summaryDir = path.join(talksDir, folderName);

    // Create folder if it doesn't exist
    if (!fs.existsSync(summaryDir)) {
      fs.mkdirSync(summaryDir);
    }

    // Generate summary and key points
    const summary = generateSummary(transcript);
    const keyPoints = extractKeyPoints(transcript);

    // Create summary.md with title
    const summaryContent = `# Summary of ${folderName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) =>
        l.toUpperCase()
      )}\n\n## Summary\n\n${summary}\n\n## Key Points\n\n${keyPoints
      .map((point, i) => `${i + 1}. ${point}`)
      .join("\n")}`;
    fs.writeFileSync(path.join(summaryDir, "summary.md"), summaryContent);

    // Update talks.json
    if (talksJson[folderName]) {
      talksJson[folderName].summary = summary;
      talksJson[folderName].keyPoints = keyPoints;
    }

    console.log(`Processed ${file}`);
  }

  // Write updated talks.json
  fs.writeFileSync(talksJsonPath, JSON.stringify(talksJson, null, 2));
  console.log("Updated talks.json");
}

// Run the script
processTalks();
