import { Application } from "https://deno.land/x/oak/mod.ts";
import { WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import * as WsEvents from "./connection.ts"
import { API_ROUTER } from "./apiroutes.ts";
import { handler } from "../build/handler.js";

export function main() {
  const wss = new WebSocketServer(8000);
  wss.on("connection",WsEvents.open);

  console.log("Websocket ready");

  const app = new Application();
  const port = 8080;

  // error handler
  app.use(async (_context, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err);
    }
  });

  // static assets
  app.use( async (context, next) => {
    try {
      if(context.request.url.pathname=='favicon.ico'){
        await context.send({
          root: `${Deno.cwd()}/server/build`,
          path: 'favicon.ico'
        });
        console.log("serving favicon");
        return;
      }
      await context.send({
        root: `${Deno.cwd()}/server/build`,
        index: "app.html"
      })
    } catch {
      await next();
    }
  });
  
  app.use(API_ROUTER.routes());
  app.use(API_ROUTER.allowedMethods());

  app.use(handler);

  app.listen({port: port});
}

if (import.meta.main) {
  main();
}
