
import fastify from './src/middleware/jwt';
import {  LoginUserRoute } from './src/routes/auth';
import { CategoryRoute } from './src/routes/category';
import { ProductRoute } from './src/routes/product';

  fastify.get('/', async (request:any, reply:any) => {
    return { hello: 'world' }
  })
  fastify.get('/jwt', {
    preHandler: [fastify.authenticate],
  }, async (request:any, reply:any) => {
    console.log("Hi")
    return reply.status(200).send({ hello: 'world' })
  })
  fastify.register(LoginUserRoute,{prefix:"/api/auth"})
  fastify.register(CategoryRoute,{prefix:"/api/category"})
  fastify.register(ProductRoute,{prefix:"/api/product"})
const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()