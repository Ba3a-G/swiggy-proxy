import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";

const app = new Hono();

app.use(cors({
    origin: "*",
    maxAge: 600,
    credentials: true,
}))

app.get("/", async (ctx: Context) => {
    const url = ctx.req.url;
    const path = url.split(".tech/")[1];
    const swiggyBase = "https://www.swiggy.com/";
    // dapi/restaurants/list/v5
    const api = swiggyBase + path;

    const response = await fetch(api);
    const data = await response.json();
    return ctx.json(data);
})

showRoutes(app);
console.log(process.env.PORT);
export default app;
