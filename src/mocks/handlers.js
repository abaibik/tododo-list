import { rest } from "msw";

const items = [
  {
    text: "feed cats",
    done: false,
    id: "1",
  },
  {
    text: "water flower",
    done: false,
    id: "2",
  },
];

export const handlers = [
  rest.post("/api/items", async (req, res, ctx) => {
    const reqParams = await req.json();
    const item = { ...reqParams, id: items.length + 1 };
    items.push(item);

    return res(ctx.json(item));
  }),

  rest.patch("/api/items/1", (req, res, ctx) => {
    items[0].done = true;
    return res(ctx.json(items[0]));
  }),

  rest.get("/api/items", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(items));
  }),
];
