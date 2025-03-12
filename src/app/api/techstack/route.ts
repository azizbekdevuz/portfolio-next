import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import {
  convertDocToTechCategory,
  TechCategoryDocument,
} from "@/models/TechStack";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const techCategoryDocs = await db
      .collection("techstack")
      .find({})
      .toArray();

    // Convert MongoDB documents to our TechCategory interface
    const techCategories = techCategoryDocs.map((doc) =>
      convertDocToTechCategory(doc as unknown as TechCategoryDocument),
    );

    // Transform array of categories into the same object structure as the original
    const techStackObject: Record<string, TechCategoryDocument> = {};

    techCategories.forEach((category) => {
      techStackObject[category.id] =
        category as unknown as TechCategoryDocument;
    });

    return NextResponse.json(techStackObject);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack data" },
      { status: 500 },
    );
  }
}
