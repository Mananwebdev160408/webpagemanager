import { NextResponse } from "next/server";
import Bookmark from "@/models/bookmark.model";
import dbconnect from "@/db/dbconnect";
await dbconnect();
export async function GET(request, { params }) {
    const resolvedparams=await params
    if(!resolvedparams) return NextResponse.json({ message: "invalid request" });
    const mongores=await Bookmark.findByIdAndDelete(resolvedparams.id);
    if(!mongores) return NextResponse.json({ message: "Bookmark not deleted" });
    return NextResponse.json({ message: "Bookmark deleted successfully" });
}