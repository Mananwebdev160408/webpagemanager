import Bookmark from "@/models/bookmark.model";
import { NextResponse } from "next/server";
import dbconnect from "@/db/dbconnect";
await dbconnect();

export async function POST(request, { params }) {
  const resolvedparams = await params;
  const { url, name, description } = await request.json();
  
  if ([url, name, description].some((field) => field.trim() == "")) {
    return NextResponse.json({ message: "All fields are required" });
  }
  const mongores = await Bookmark.create({ url, name, description, user: resolvedparams.id });
  if (!mongores) return NextResponse.json({ message: "Bookmark not created" });
  return NextResponse.json(
    { message: "Bookmark created successfully", mongores },
    { status: 200 }
  );
}
