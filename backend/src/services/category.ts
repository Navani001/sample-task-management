import prisma from "../lib/prisma";

export async function GetCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { message: "Categories fetched successfully", data: categories };
  } catch (err) {
    console.error("Error fetching categories:", err);
    return { message: "Failed to fetch categories", data: null };
  }
}

export async function CreateCategory(data: any) {
  if (!data || !data.name || !data.id) {
    console.log("No name or ID provided");
    return { message: "Category name and ID are required", data: null };
  }

  try {
    console.log("Creating category:", data);

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: data.name,
     
        isDeleted: false
      }
    });

    if (existingCategory) {
      return { message: "Category already exists", data: null };
    }

    // Create new category
    const category = await prisma.category.create({
      data: {
        name: data.name,
        id: data.id,
      }
    });

    console.log("Category created:", category);
    return { message: "Category created successfully", data: category };
  } catch (err) {
    console.error("Error creating category:", err);
    return { message: "Failed to create category", data: null };
  }
}

export async function RemoveCategory(data: any) {
  if (!data || !data.id) {
    console.log("No ID provided");
    return { message: "Category ID is required", data: null };
  }

  try {
    console.log("Deleting category with ID:", data.id);

    // Check if category exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: data.id,
        isDeleted: false
      }
    });

    if (!existingCategory) {
      return { message: "Category not found", data: null };
    }

    // Soft delete the category
    const category = await prisma.category.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true,
        updatedAt: new Date()
      }
    });

    console.log("Category deleted:", category);
    return { message: "Category deleted successfully", data: category };
  } catch (err) {
    console.error("Error deleting category:", err);
    return { message: "Failed to delete category", data: null };
  }
}