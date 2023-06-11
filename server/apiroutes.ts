import { Router } from "https://deno.land/x/oak/mod.ts";
import { BodyType } from "https://deno.land/x/oak@v12.5.0/body.ts";
import { createLobby } from "./lobby.ts";

export const API_ROUTER = new Router()
  .post("/play", (context) =>  {
    if(context.request.hasBody){
      const body = context.request.body({
        type: "form-data" as BodyType
      });
      

      context.response.status = 303;
      context.response.redirect("/play/chat")
    }
  });