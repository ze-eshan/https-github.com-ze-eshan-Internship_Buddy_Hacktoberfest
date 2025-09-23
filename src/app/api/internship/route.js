
import { NextResponse } from "next/server";
import { insertInternshipEmbedings } from "../pinecone/internship/write";


export async function POST(req) {
  try {
    const body = await req.json();
    const { embeddings, internship_id } = body;

    if (!embeddings || !internship_id) {
      return NextResponse.json(
        { error: "Missing embeddings or internship_id" },
        { status: 400 }
      );
    }

    // Store embeddings in Pinecone
    await insertInternshipEmbedings(embeddings, internship_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error storing embeddings:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req){
  return NextResponse.json({msg:"HELLO"})
}