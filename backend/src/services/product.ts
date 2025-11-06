import prisma from "../lib/prisma";

export async function GetProducts(filters?: { categoryId?: number; search?: string }) {
  try {
    // Build where clause based on optional filters
    const whereClause: any = {
      isDeleted: false
    };

    if (filters) {
      if (filters.categoryId !== undefined) {
        whereClause.categoryId = filters.categoryId;
      }
      if (filters.search) {
        whereClause.name = { contains: filters.search, mode: 'insensitive' } as any;
      }
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { message: "Products fetched successfully", data: products };
  } catch (err) {
    console.error("Error fetching products:", err);
    return { message: "Failed to fetch products", data: null };
  }
}

export async function GetSingleProduct(data: any) {
  if (!data || !data.id) {
    console.log("No ID provided");
    return { message: "Product ID is required", data: null };
  }

  try {
    console.log("Fetching product with ID:", data.id);

    const product = await prisma.product.findFirst({
      where: {
        id: data.id,
        isDeleted: false
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!product) {
      return { message: "Product not found", data: null };
    }

    console.log("Product fetched:", product);
    return { message: "Product fetched successfully", data: product };
  } catch (err) {
    console.error("Error fetching product:", err);
    return { message: "Failed to fetch product", data: null };
  }
}

export async function CreateProduct(data: any) {
  if (!data || !data.name || !data.categoryId || !data.price) {
    console.log("Missing required fields");
    return { message: "Product name, categoryId, and price are required", data: null };
  }

  try {
    console.log("Creating product:", data);

    // Check if category exists
    const categoryExists = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        isDeleted: false
      }
    });

    if (!categoryExists) {
      return { message: "Category not found", data: null };
    }

    // Create new product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        price: data.price,
        stock: data.stock || 0
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log("Product created:", product);
    return { message: "Product created successfully", data: product };
  } catch (err) {
    console.error("Error creating product:", err);
    return { message: "Failed to create product", data: null };
  }
}

export async function ModifyProduct(data: any) {
  if (!data || !data.id) {
    console.log("No ID provided");
    return { message: "Product ID is required", data: null };
  }

  try {
    console.log("Updating product with ID:", data.id);

    // Check if product exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: data.id,
        isDeleted: false
      }
    });

    if (!existingProduct) {
      return { message: "Product not found", data: null };
    }

    // If categoryId is provided, check if category exists
    if (data.categoryId) {
      const categoryExists = await prisma.category.findFirst({
        where: {
          id: data.categoryId,
          isDeleted: false
        }
      });

      if (!categoryExists) {
        return { message: "Category not found", data: null };
      }
    }

    // Prepare update data (only include provided fields)
    const updateData: any = {
      updatedAt: new Date()
    };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.stock !== undefined) updateData.stock = data.stock;

    // Update product
    const product = await prisma.product.update({
      where: {
        id: data.id
      },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log("Product updated:", product);
    return { message: "Product updated successfully", data: product };
  } catch (err) {
    console.error("Error updating product:", err);
    return { message: "Failed to update product", data: null };
  }
}

export async function RemoveProduct(data: any) {
  if (!data || !data.id) {
    console.log("No ID provided");
    return { message: "Product ID is required", data: null };
  }

  try {
    console.log("Deleting product with ID:", data.id);

    // Check if product exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: data.id,
        isDeleted: false
      }
    });

    if (!existingProduct) {
      return { message: "Product not found", data: null };
    }

    // Soft delete the product
    const product = await prisma.product.update({
      where: {
        id: data.id
      },
      data: {
        isDeleted: true,
        updatedAt: new Date()
      }
    });

    console.log("Product deleted:", product);
    return { message: "Product deleted successfully", data: product };
  } catch (err) {
    console.error("Error deleting product:", err);
    return { message: "Failed to delete product", data: null };
  }
}