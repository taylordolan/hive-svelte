<script>
  export let x;
  export let y;
  export let status;
  export let content;
  import { board, holding, size } from './stores.js';

  const placeHeldBug = (x, y) => {
    if ($holding) {
      $board[x][y].content.push($holding);
      $board[x][y].status = "filled";
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
    for (x = 0; x < $size; x++) { markColHexes(x) };
    for (y = 0; y < $size; y++) { hideRowHexes(y) };
    // any hexes that were marked by `markColHexes` but not hidden
    // by `hideRowHexes` get hidden again.
    for (x = 0; x < $size; x++) {
      for (y = 0; y < $size; y++) {
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
    for (let y = 0; y < $size; y++) {
      if ($board[x][y].status === "open") {
        markEm = true;
      }
    }
    // this is where we do the actual marking of all hexes in the row.
    if (markEm) {
      for (let y = 0; y < $size; y++) {
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
    for (let x = 0; x < $size; x++) {
      if ($board[x][y].status === "open") {
        hideEm = true;
      }
    }
    // this is where we do the actual hiding of all marked hexes in the row.
    if (hideEm) {
      for (let x = 0; x < $size; x++) {
        if ($board[x][y].status === "marked") {
          $board[x][y].status = "hide";
        }
      }
    }
  }
</script>

{#if (status != "none")}
<div class="hex-wrapper" data-x={x} data-y={y}>
  <svg on:click={placeHeldBug(x,y)} class="hex {status}" viewBox="0 0 115.5 100">
    <polygon points="29 0 0 50 29 100 86.51 100 115.5 50 86.51 0 29 0"></polygon>
  </svg>
  {#if content.length}
    {content[0]}
  {/if}
</div>
{/if}

<style>
  .hex-wrapper {
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
    margin: 0 -14.5px;
    position: relative;
    text-align: center;
    width: 115.5px;
  }

  .hex {
    cursor: pointer;
    fill: transparent;
    height: 100%;
    overflow: visible;
    position: absolute;
    stroke-width: 2px;
    stroke: transparent;
    width: 100%;
  }

  .hex.open {
    stroke: #ddd;
    z-index: 0;
  }

  .hex.filled {
    stroke: #aaa;
    z-index: 1;
  }
</style>
