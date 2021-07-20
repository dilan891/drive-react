import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("http://localhost:4000/api/carpets", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ name: "juan", carpet: "none", _id: "23" }]));
  }),
  rest.post("http://localhost:4000/api/archives", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ name: "archivo1", carpet: "none", _id: "65423" }]));
  })
];


// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

export { server, rest };