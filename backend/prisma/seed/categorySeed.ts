import prisma from "../../src/lib/prisma";

const data = [
  {
    id: 1,
    name: "Electronics",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Clothing",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Books",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Home & Garden",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Sports & Fitness",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Beauty & Health",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Toys & Games",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Automotive",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

async function categorySeed() {
  for (const record of data) {
    await prisma.category.upsert({
      where: { id: record.id },
      create: record,
      update: record
    });
  }
}

export default categorySeed;