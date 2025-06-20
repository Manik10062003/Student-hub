import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return Response.json({ error: "Invalid link" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.redirect(`${process.env.NEXTAUTH_URL}/signin`);

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
