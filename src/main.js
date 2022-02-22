import App from './App.svelte';
import { board, white, black, holding } from './stores.js';

// const setHeldBug = (player, bug) => {
//   if (!$holding && player.bugs[bug]) {
//     player.bugs[bug]--;
//     $holding = bug;
//   }
// }

const placeHeldBug = (x, y) => {
  if (holding) {
    $board[x][y].content.push(holding);
    // board[x][y].status = "filled";
    $holding = null;
    openAdjacentHexes(x, y);
  }
}

// called when a bug is placed in an empty hex
const openAdjacentHexes = (x, y) => {
  // cardinal directions
  const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
  // column-dependent directions
  if (x % 2 === 0) {
    dirs.push([-1,-1], [1,-1]);
  } else {
    dirs.push([-1,1], [1,1]);
  }

  for (let i = 0; i < dirs.length; i++) {
    let dir = dirs[i];
    let newX = x + dir[0];
    let newY = y + dir[1]
    try {
      let target = $board[newX][newY];
      if (target.status !== "filled") {
        target.status = "open";
      }
    } catch {};
  }

  // for every empty hex that has a visible hex in its row and its column,
  // we want to set its status to "hide", which makes it take up space in the dom
  // without having any visual styling. this makes sure all visible hexes are
  // rendered adjacent to the right hexes.
  for (x = 0; x < cols; x++) { markColHexes(x) };
  for (y = 0; y < rows; y++) { hideRowHexes(y) };
  // any hexes that were marked by `markColHexes` but not hidden
  // by `hideRowHexes` get hidden again.
  for (x = 0; x < cols; x++) {
    for (y = 0; y < rows; y++) {
      if ($board[x][y].status === "marked") {
        $board[x][y].status = "none";
      }
    };
  };
}

const markColHexes = (x) => {
  let markEm = false;
  // for every row in the given column, see if there's a visible hex.
  // if at least one exists, then we'll mark all hexes in this row.
  for (let y = 0; y < rows; y++) {
    if ($board[x][y].status === "open") {
      markEm = true;
    }
  }
  // this is where we do the actual marking of all hexes in the row.
  if (markEm) {
    for (let y = 0; y < rows; y++) {
      if ($board[x][y].status === "none") {
        $board[x][y].status = "marked";
      }
    }
  }
}

const hideRowHexes = (y) => {
  let hideEm = false;
  // for every column in the given row, see if there's a visible hex.
  // if at least one exists, then all marked hexes in the row are hidden
  // (instead of being removed from the dom altogether).
  for (let x = 0; x < cols; x++) {
    if ($board[x][y].status === "open") {
      hideEm = true;
    }
  }
  // this is where we do the actual hiding of all marked hexes in the row.
  if (hideEm) {
    for (let x = 0; x < cols; x++) {
      if ($board[x][y].status === "marked") {
        $board[x][y].status = "hide";
      }
    }
  }
}

const app = new App({
	target: document.body,
	props: {
    // white: new Player("white"),
    // black: new Player("black"),
	}
});

export default app;
