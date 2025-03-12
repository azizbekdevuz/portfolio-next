import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import { convertDocToJourneySection, JourneyDataDoc } from "@/models/Journey";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const journeyDocs = await db.collection("journey").find({}).toArray();

    // Convert MongoDB documents to our JourneyData interface
    const journeySections = journeyDocs.map((doc) =>
      convertDocToJourneySection(doc as unknown as JourneyDataDoc),
    );

    return NextResponse.json(journeySections);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch journey data" },
      { status: 500 },
    );
  }
}
