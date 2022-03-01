import { writable, readable } from 'svelte/store';

// board setup
const s = 45; // the number of rows and columns
let b = [];
for (let x = 0; x < s; x++) {
  b[x] = [];
  for (let y = 0; y < s; y++) {
    b[x][y] = {
      x: x,
      y: y,
      status: "none",
      content: [],
    };
  }
}

// open center tile for first bug to be placed
b[Math.floor(s/2)][Math.floor(s/2)].status = "open";

export const size = readable(s);
export const board = writable(b);
export const white = writable({
  color: "white",
  bugs: { ant: 3, beetle: 2, grasshopper: 3, queen: 1, spider: 2 },
});
export const black = writable({
  color: "black",
  bugs: { ant: 3, beetle: 2, grasshopper: 3, queen: 1, spider: 2 },
});
export const holding = writable(null);
