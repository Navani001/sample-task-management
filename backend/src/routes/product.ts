import { FastifyInstance } from "fastify";
import { GetAllProducts, GetProduct, AddProduct, UpdateProduct, DeleteProduct } from "../controllers/product";

export async function ProductRoute(fastify: FastifyInstance) {
  fastify.get("/products", GetAllProducts);
  fastify.get("/product/:id", GetProduct);
  fastify.post("/product", AddProduct);
  fastify.put("/product/:id", UpdateProduct);
  fastify.delete("/product/:id", DeleteProduct);
}