const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer((socket) => {});

server.on("connection", async (socket) => {
  let fileHandler;
  let fileWriteStream;

  socket.on("error", (error) => {});

  // listen on events
  socket.on("data", async (chunck) => {
    if (!fileHandler) {
      socket.pause();
      const data = chunck.toString();
      const lastIndex = data.indexOf("+--msg--+");
      const filename = data.slice(9, lastIndex);

      fileHandler = await fs.open(`storage/${filename}`, "w");
      fileWriteStream = fileHandler.createWriteStream();
      console.log(`file ${filename} is uploading`);

      const rightChunk = data.slice(lastIndex + 9);
      fileWriteStream.write(rightChunk);
      socket.resume();

      fileWriteStream.on("drain", () => {
        socket.resume();
      });

      socket.on("close", () => {
        console.log(`file ${filename} is finished uploading`);
        fileHandler?.close();
        fileHandler = null;
        fileWriteStream = null;
      });
    } else {
      if (!fileWriteStream.write(chunck)) {
        socket.pause();
      }
    }
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
});
