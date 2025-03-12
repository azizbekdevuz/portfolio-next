// app/api/projects/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";
import { convertDocToProject, ProjectDocument } from "../../../models/Project";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const projectDocs = await db
      .collection("projects")
      .find({})
      .sort({ title: 1 })
      .toArray();

    // Convert MongoDB documents to our Project interface
    const projects = projectDocs.map((doc) =>
      convertDocToProject(doc as unknown as ProjectDocument),
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
