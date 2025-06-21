import { Server } from "socket.io";

let io;

export async function GET(req) {
  if (!io) {
    io = new Server({
      cors: {
        origin: process.env.NEXTAUTH_URL,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", async (msg) => {
  io.to(msg.community).emit("message", msg);
  await Message.create(msg); // Save to DB
});

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket initialized", { status: 200 });
}
2