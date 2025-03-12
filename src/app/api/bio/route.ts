import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import { convertDocToBioSection, BioSectionDocument } from "@/models/Bio";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const bioSectionDocs = await db.collection("bio").find({}).toArray();

    // Convert MongoDB documents to our BioSection interface
    const bioSections = bioSectionDocs.map((doc) =>
      convertDocToBioSection(doc as unknown as BioSectionDocument),
    );

    return NextResponse.json(bioSections);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bio sections" },
      { status: 500 },
    );
  }
}
