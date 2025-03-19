import clientPromise from "@/libs/mongodb";
import { BioSectionDocument, convertDocToBioSection } from "@/models/Bio";
import { JourneyDataDoc, convertDocToJourneySection } from "@/models/Journey";
import { TechCategory, TechCategoryDocument, convertDocToTechCategory } from "@/models/TechStack";
import { AchievementDocument, convertDocToAchievement } from "@/models/Achievement";
import { ProjectDocument, convertDocToProject } from "@/models/Project";
import { getWithCache } from "@/libs/redis";

export const revalidate = 3600;

// Helper function to make objects serializable
function makeSerializable<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Fetch Data Function (No Hooks Inside)
async function getData() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const [bioSections, journeyData, techCategories, achievements, projects] = await Promise.all([
      getWithCache("bio_sections", async () => {
        const docs = await db.collection("bio").find({}).toArray();
        return docs.map((doc) => convertDocToBioSection(doc as unknown as BioSectionDocument));
      }),
      getWithCache("journey_data", async () => {
        const docs = await db.collection("journey").find({}).toArray();
        return docs.map((doc) => convertDocToJourneySection(doc as unknown as JourneyDataDoc));
      }),
      getWithCache("tech_categories", async () => {
        const docs = await db.collection("techstack").find({}).toArray();
        return docs.reduce((acc, category) => {
          const converted = convertDocToTechCategory(category as unknown as TechCategoryDocument);
          acc[converted.id] = converted;
          return acc;
        }, {} as Record<string, TechCategory>);
      }),
      getWithCache("achievements", async () => {
        const docs = await db.collection("achievements").find({}).toArray();
        return docs.map((doc) => convertDocToAchievement(doc as unknown as AchievementDocument));
      }),
      getWithCache("projects", async () => {
        const docs = await db.collection("projects").find({}).toArray();
        return docs.map((doc) => convertDocToProject(doc as unknown as ProjectDocument));
      }),
    ]);

    return {
      bioSections: makeSerializable(bioSections),
      journeyData: makeSerializable(journeyData),
      techStack: makeSerializable(techCategories),
      achievements: makeSerializable(achievements),
      projects: makeSerializable(projects),
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      bioSections: [],
      journeyData: [],
      techStack: {} as Record<string, TechCategory>,
      achievements: [],
      projects: [],
    };
  }
}

// Server Component Entry Point
export default async function Home() {
  const data = await getData();
  return <HomeContent data={data} />;
}

import HomeContent from "@/components/HomeContext";