const net = require("net");
const fs = require("fs/promises");
const readLine = require("readline/promises");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let fileHandler;
let fileReadStream;
let upladedPersentage = 0;
let uploadedSize = 0;

const client = net.createConnection(
  {
    port: 8000,
    host: "localhost",
  },
  main
);

client.on("data", async (chunck) => {
  console.log(chunck.toString());
});

client.on("drain", () => {
  fileReadStream?.resume();
});

// utils
async function clearLine() {
  return new Promise((r) => {
    process.stdout.clearLine(0, () => r());
  });
}

async function moveCursor(dir = -1) {
  return new Promise((r) => {
    process.stdout.moveCursor(-1, dir, () => r());
  });
}

async function main() {
  try {
    console.log();
    const filepath = process.argv[2];
    const filename = filepath.split("/").pop();
    client.write(`filename:${filename}+--msg--+`);
    uploadedSize = (await fs.stat(filepath)).size;
    fileHandler = await fs.open(filepath, "r");
    fileReadStream = fileHandler.createReadStream();
    fileReadStream.on("data", flushData);
    fileReadStream.on("end", () => {
      console.log("finished");
      process.exit(0);
    });
  } catch (err) {
    console.log(err);
    client.end();
  }
}

async function askQuestion(question) {
  const msg = await rl.question(question);
  return msg;
}

async function flushData(data) {
  upladedPersentage += data.length;
  if (!client.write(data)) {
    fileReadStream?.pause();
  }
  await clearLine();
  await moveCursor();
  const persentage = Math.round((upladedPersentage / uploadedSize) * 100);
  console.log(`Uploaded: ${persentage}%`);
}
