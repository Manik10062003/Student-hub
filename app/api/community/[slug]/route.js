import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  await connectDB();
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const slug = url.pathname.split("/").pop();

  const user = await User.findOne({ email });
  const joined = user?.joinedCommunities?.includes(slug) || false;

  const followers = await User.countDocuments({
    joinedCommunities: slug
  });

  return Response.json({ joined, followers });
}

export async function POST(request) {
  await connectDB();
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop();
  const body = await request.json();
  const { email } = body;

  await User.updateOne(
    { email },
    { $addToSet: { joinedCommunities: slug } }
  );

  return Response.json({ message: "Joined successfully" });
}
