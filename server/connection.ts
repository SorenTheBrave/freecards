import { WebSocketClient, WebSocketError } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const clients: Map<string, WebSocketClient> = new Map();

export function open(ws: WebSocketClient): void {
  const clientId = generateClientId();
  clients.set(clientId,ws);
  ws.send(JSON.stringify({
    message:"Welcome to FreeCards!",
    clientId: clientId 
  }));
  // ws.on("message",message);
  ws.on("error",(error: WebSocketError) => wsError(error,clientId));
  ws.on("close", () => ws.close(0));
}

// export function message(ws: WebSocketClient, message: string): void {
  
// }

export function wsError(err: WebSocketError, clientId: string): void {
  console.error(`WS Client ${clientId} error: ${err}`);
}

export function close(ws: WebSocketClient, clientId: string): void {
  clients.delete(clientId);
  ws.close(0);
}

// main interface for the server-side game logic to interact with its connected players
export function messageClient(clientId: string, message: string) {
  if(!clients.has(clientId)) return null;
  const client = clients.get(clientId);
  client?.send(message);
}


// Generate client IDs in the form [A-Z0-9]{4}
function generateClientId(): string {
  const codes: number[] = [];
  let newId = '';
  while(newId.length < 1 || clients.has(newId)){
    for(let i=0; i<4; i++){
      const newCharDigit = Math.floor(Math.random() * 36);
      if(newCharDigit < 10) {
        codes.push(newCharDigit+48);
        continue;
      }
      codes.push((newCharDigit+55));
    }
    newId = String.fromCharCode(...codes);
  }
  return newId;
}