import { writable } from 'svelte/store';

// board setup
const size = 45; // the number of rows and columns
let b = [];
for (let x = 0; x < size; x++) {
  b[x] = [];
  for (let y = 0; y < size; y++) {
    b[x][y] = {
      x: x,
      y: y,
      content: [],
      status: "none",
    };
  }
}
b[Math.floor(size/2)][Math.floor(size/2)].status = "open";

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
