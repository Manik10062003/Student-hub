// app/api/chat/[community]/messages/route.js
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function GET(_, { params }) {
  await connectDB();
  const messages = await Message.find({ community: params.community })
    .sort({ createdAt: 1 })
    .limit(100);
  return Response.json(messages);
}
