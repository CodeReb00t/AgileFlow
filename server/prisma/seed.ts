import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }

  // Reset auto-increment sequences to avoid unique constraint errors
  // after seeding with explicit IDs
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Task_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Task") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Project_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Project") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"User_userId_seq"', (SELECT COALESCE(MAX("userId"), 0) FROM "User") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Team_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Team") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"ProjectTeam_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "ProjectTeam") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"TaskAssignment_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "TaskAssignment") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Attachment_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Attachment") + 1, false)`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Comment_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Comment") + 1, false)`,
  );
  console.log("Auto-increment sequences reset successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
