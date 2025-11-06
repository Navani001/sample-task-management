import { FastifyReply, FastifyRequest } from "fastify";
import { GetCategories, CreateCategory, RemoveCategory } from "../services/category";

export async function GetAllCategories(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Call the GetCategories function
    const result = await GetCategories();

    // If successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Categories fetched successfully',
        data: result.data
      });
    } else {
      // If there was an error
      return reply.status(404).send({
        success: false,
        message: 'No categories found',
        error: 'Categories not found'
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

export async function AddCategory(req: FastifyRequest, reply: FastifyReply) {
  const { name,id } = req.body as { name: string,id:number };

  try {
    // Call the CreateCategory function
    const result = await CreateCategory({ name,id });

    // If creation was successful
    if (result.data) {
      // Send success response
      return reply.status(201).send({
        success: true,
        message: 'Category created successfully',
        data: result.data
      });
    } else {
      // If there was an error during creation
      return reply.status(400).send({
        success: false,
        message: 'Category creation failed',
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

export async function DeleteCategory(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };

  try {
    // Call the RemoveCategory function
    const result = await RemoveCategory({ id: parseInt(id) });

    // If deletion was successful
    if (result.data) {
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Category deleted successfully',
        data: result.data
      });
    } else {
      // If there was an error during deletion
      return reply.status(400).send({
        success: false,
        message: 'Category deletion failed',
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