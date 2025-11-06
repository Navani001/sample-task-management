import { FastifyReply, FastifyRequest } from "fastify";
import { GetProducts, GetSingleProduct, CreateProduct, ModifyProduct, RemoveProduct } from "../services/product";

export async function GetAllProducts(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Read optional query params for filtering
    const { categoryId, search } = req.query as { categoryId?: string; search?: string };

    const filters: any = {};
    if (categoryId !== undefined) {
      const parsed = parseInt(categoryId as string);
      if (!Number.isNaN(parsed)) filters.categoryId = parsed;
    }
    if (search) {
      filters.search = search;
    }

    // Call the GetProducts function with filters
    const result = await GetProducts(filters);

    // If successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Products fetched successfully',
        data: result.data
      });
    } else {
      // If there was an error
      return reply.status(404).send({
        success: false,
        message: 'No products found',
        error: 'Products not found'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function GetProduct(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    // Call the GetSingleProduct function
    const result = await GetSingleProduct({ id: parseInt(id) });

    // If successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Product fetched successfully',
        data: result.data
      });
    } else {
      // If there was an error
      return reply.status(404).send({
        success: false,
        message: 'Product not found',
        error: result.message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function AddProduct(req: FastifyRequest, reply: FastifyReply) {
  const { name, categoryId, price, stock } = req.body as { 
    name: string; 
    categoryId: number; 
    price: number; 
    stock: number; 
  };

  try {
    // Call the CreateProduct function
    const result = await CreateProduct({ name, categoryId, price, stock });

    // If creation was successful
    if (result.data) {
      // Send success response
      return reply.status(201).send({
        success: true,
        message: 'Product created successfully',
        data: result.data
      });
    } else {
      // If there was an error during creation
      return reply.status(400).send({
        success: false,
        message: 'Product creation failed',
        error: result.message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function UpdateProduct(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const { name, categoryId, price, stock } = req.body as { 
    name?: string; 
    categoryId?: number; 
    price?: number; 
    stock?: number; 
  };

  try {
    // Call the ModifyProduct function
    const result = await ModifyProduct({ id: parseInt(id), name, categoryId, price, stock });

    // If update was successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Product updated successfully',
        data: result.data
      });
    } else {
      // If there was an error during update
      return reply.status(400).send({
        success: false,
        message: 'Product update failed',
        error: result.message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function DeleteProduct(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    // Call the RemoveProduct function
    const result = await RemoveProduct({ id: parseInt(id) });

    // If deletion was successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Product deleted successfully',
        data: result.data
      });
    } else {
      // If there was an error during deletion
      return reply.status(400).send({
        success: false,
        message: 'Product deletion failed',
        error: result.message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}