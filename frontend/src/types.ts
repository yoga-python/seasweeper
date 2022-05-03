export type GameState = {
  gamemodes: Gamemode[];
  currentGamemode: Gamemode;
  currentGameBoard: Board;
  mappedGamemodes?: any;
  showGamemodeCarousel: boolean;
  gameStarted: boolean;
  gameOver: boolean;
  gameWin: boolean;
  gameTime: number;
  lighthouseMode: boolean;
  availableLighthouses: number;
  markMode: boolean;
  numMarkers: number;
  numRevealed: number;
  isSendingHighscore: boolean;
};

export type HighscoreEntry = {
  playerName: string;
  time: number;
  rank: number;
  timestamp?: number;
  gameMode?: string;
  id?: string;
};

export type Gamemode = {
  name: string;
  label: string;
  link: string;
  w: number;
  h: number;
  numBombs: number;
  nLighthouses: number;
  nIslands: number;
  clusterSpread: number;
  id: number;
  board?: any;
};

export type TileType = {
  id: number;
  x: number;
  y: number;
  count: number;
  type: number;
  marked: boolean;
  bomb: boolean;
  revealed: boolean;
  lit?: boolean;
  lighthouse?: boolean;
};

export type Point = {
  x: number;
  y: number;
};

export type MapArray = number[][];

export type Board = {
  board: TileType[];
  width: number;
  height: number;
  nBombs: number;
  bombIds?: number[];
};
