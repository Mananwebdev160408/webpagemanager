import Bookmark from "@/models/bookmark.model";
import { NextResponse } from "next/server";
import dbconnect from "@/db/dbconnect";
await dbconnect();
export async function GET(request,{ params }) {
  const resolvedparams = await params;
  console.log(resolvedparams);
  
  try {
    if (!resolvedparams) return NextResponse.json({ message: "invalid request" });
    const allbookmarks = await Bookmark.find({ user: resolvedparams.id });
    if (!allbookmarks)
      return NextResponse.json({ message: "No bookmarks found" });
    return NextResponse.json({ allbookmarks });
  } catch (error) {
    console.log(error);
  }
}
