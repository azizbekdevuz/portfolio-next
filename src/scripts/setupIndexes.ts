import clientPromise from "@/libs/mongodb";

async function setupDbIndexes() {
  try {
    console.log("Setting up MongoDB indexes...");
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Create indexes for collections
    await Promise.all([
      // Bio collection
      db.collection("bio").createIndex({ title: 1 }),

      // Journey collection
      db.collection("journey").createIndex({ date: -1 }),

      // Tech stack collection
      db.collection("techstack").createIndex({ title: 1 }),

      // Achievements collection
      db.collection("achievements").createIndex({ title: 1 }),

      // Projects collection
      db.collection("projects").createIndex({ title: 1 }),
    ]);

    console.log("MongoDB indexes created successfully");
  } catch (error) {
    console.error("Error creating MongoDB indexes:", error);
  } finally {
    process.exit(0);
  }
}

setupDbIndexes();
