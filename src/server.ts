import Fastify from "fastify";

const { PORT } = process.env;

const server = Fastify({
  logger: true,
});

server.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

server.register(require("./0_routes/materialRouter"));
server.register(require("./0_routes/materialCategoryRouter"));
server.register(require("./0_routes/materialInventoryRouter"));
server.register(require("./0_routes/clientRouter"));
server.register(require("./0_routes/serviceRouter"));
server.register(require("./0_routes/serviceOrderRouter"));

server
  .listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log("Rai API running on port " + PORT))
  .catch((e) => {
    server.log.error(e);
    process.exit(1);
  });
