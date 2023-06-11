// Shared internals for lobby management
// any messages are assumed to be properly serializable json,
// or plain messages w/e. We won't check it
import { WebSocketClient } from 'https://deno.land/x/websocket@v0.1.4/mod.ts';
import { messageClient } from './connection.ts';
import { GameType } from './game.ts';

type Player = {
  clientId: string;
  name: string;
}

export type Lobby = {
  gameType: GameType;
  name: string;
  id: string;
  players: Player[];
  privateLobby: boolean;
  spectators: Player[];
}

export type CreateLobbyOptions = {
  gameType: GameType;
  cpuCount?: number;
  name?: string;
  privateLobby?: boolean;
}

const lobbies = new Map<string,Lobby>();

export function broadcast(lobbyId: string, message: string) {
  if(!lobbies.has(lobbyId)) return null;
  const lobby = lobbies.get(lobbyId);
  if(!lobby?.players.length) return null;
  for(const player of lobby.players) {
    messageClient(player.clientId,message);
  }
}

export function createLobby(options: CreateLobbyOptions) {
  const newId = generateLobbyId();
  const newLobby = {
    gameType: options.gameType,
    id: newId,
    name: options.name,
    players: [] as Player[],
    privateLobby: options.privateLobby || false,
    spectators: [] as Player[],
  } as Lobby;
  lobbies.set(newId,newLobby);
  return newLobby;
}

export function joinLobby(ws: WebSocketClient, lobbyId: string, playerName: string) {
  if(!lobbies.has(lobbyId)) return null;
  const lobby = lobbies.get(lobbyId);
  
}

// Generate lobby IDs in the form [A-Z0-9]{4}
function generateLobbyId(): string {
  const codes: number[] = [];
  let newId = '';
  while(newId.length < 1 || lobbies.has(newId)){
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
