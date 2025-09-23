import { NextResponse } from "next/server";
import { searchInternships } from "../pinecone/internship/read";


export async function POST(req) {
  try {
    const body = await req.json();
    const { embeddings} = body;

    if (!embeddings) {
      return NextResponse.json(
        { error: "Missing embeddings in request body" },
        { status: 400 }
      );
    }

    // Perform Pinecone search
    const results = await searchInternships(embeddings, 5);

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error searching internships:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// optional test endpoint
export async function GET() {
  return NextResponse.json({ msg: "Internship Search API is running ✅" });
}
