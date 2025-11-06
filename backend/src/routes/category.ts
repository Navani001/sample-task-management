import { FastifyInstance } from "fastify";
import { GetAllCategories, AddCategory, DeleteCategory } from "../controllers/category";

export async function CategoryRoute(fastify: FastifyInstance) {
  fastify.get("/categories", GetAllCategories);
  fastify.post("/category", AddCategory);
  fastify.delete("/category/:id", DeleteCategory);
}