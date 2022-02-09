<script>
  import Hex from "./Hex.svelte";
  const colCount = 45;
	const rowCount = 45;

  let board = [];
  for (let x = 0; x < colCount; x++) {
    board[x] = [];
    for (let y = 0; y < rowCount; y++) {
      board[x][y] = {
        x: x,
        y: y,
        content: [],
        status: "none",
      };
    }
  }
  board[23][23].status = "open";
</script>

<main>
	<div id="board">
    {#each board as col, x}
      <div
        class:shift-up = "{x % 2 === 0}"
        class:shift-down = "{x % 2 !== 0}"
      >
      {#each col as hex, y}
        <Hex {...hex}/>
      {/each}
      </div>
    {/each}
  </div>
  <!-- <div id="white" class="player"></div> -->
  <!-- <div id="black" class="player"></div> -->
</main>

<style>
	main {
    display: flex;
    font-family: "SF Mono", monospace;
    height: 100vh;
    padding: 25px 0;
    width: 100vw;
	}

  #board {
    display: inline-flex;
    margin: auto;
  }

  .shift-up {
    transform: translateY(-25px);
  }

  .shift-down {
    transform: translateY(25px);
  }
</style>
