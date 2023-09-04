import Fastify from "fastify";

const { PORT } = process.env;

const server = Fastify({
  logger: true,
});

server.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

server.register(require("./routes/materialRouter"));
server.register(require("./routes/materialCategoryRouter"));

server
  .listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log("Rai API running on port " + PORT))
  .catch((e) => {
    server.log.error(e);
    process.exit(1);
  });
