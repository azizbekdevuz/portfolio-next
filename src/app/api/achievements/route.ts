import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import {
  convertDocToAchievement,
  AchievementDocument,
} from "@/models/Achievement";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const achievementDocs = await db
      .collection("achievements")
      .find({})
      .toArray();

    // Convert MongoDB documents to our Achievement interface
    const achievements = achievementDocs.map((doc) =>
      convertDocToAchievement(doc as unknown as AchievementDocument),
    );

    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 },
    );
  }
}
