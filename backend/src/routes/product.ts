import { FastifyInstance } from "fastify";
import { GetAllProducts, GetProduct, AddProduct, UpdateProduct, DeleteProduct } from "../controllers/product";

export async function ProductRoute(fastify: FastifyInstance) {
  // Allow optional query params: categoryId (integer) and search (string)
  fastify.get(
    "/products",
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            categoryId: { type: 'integer' },
            search: { type: 'string' }
          }
        }
      }
    },
    GetAllProducts
  );
  fastify.get("/product/:id", GetProduct);
  fastify.post("/product", AddProduct);
  fastify.put("/product/:id", UpdateProduct);
  fastify.delete("/product/:id", DeleteProduct);
}