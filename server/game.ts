// Every game that FreeCards currently supports, as a string union.
export type GameType = 
  'Hearts';

  export type GameDefinition = {
    gameName: string;
    maxPlayers: number;
    minPlayer: number;
  }