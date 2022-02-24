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
  bugs: { a: 3, b: 2, g: 3, q: 1, s: 2 },
});
export const black = writable({
  color: "black",
  bugs: { a: 3, b: 2, g: 3, q: 1, s: 2 },
});
export const holding = writable(null);
