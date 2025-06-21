import { Server } from "socket.io";
import express from "express";
import http from "http";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // your Next.js frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");
 
  socket.on("joinRoom", ({ room, email }) => {
    socket.join(room);
    socket.to(room).emit("message", { email: "System", text: `${email} joined the chat` });
  });

  socket.on("chatMessage", ({ room, email, text }) => {
    io.to(room).emit("message", { email, text });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3001, () => {
  console.log("Socket server running on port 3001");
});
