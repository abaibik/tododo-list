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
  rest.post("/api/items", (req, res, ctx) => {
    return res(
      ctx.json({
        text: "cook lunch",
        done: false,
        id: "1",
      })
    );
  }),

  rest.patch("/api/items/1", (req, res, ctx) => {
    items[0].done = true;
    return res(ctx.json(items[0]));
  }),

  rest.get("/api/items", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(items));
  }),
];
