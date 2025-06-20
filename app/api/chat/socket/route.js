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

      socket.on("message", (msg) => {
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket initialized", { status: 200 });
}
