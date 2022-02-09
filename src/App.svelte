<script>
  const colCount = 45;
	const rowCount = 45;

  let board = [];
  for (let x = 0; x < colCount; x++) {
    board[x] = [];
    for (let y = 0; y < rowCount; y++) {
      board[x][y] = {
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
        <div class="hex-wrapper {hex.status}" data-xy="{x},{y}">
          <svg class="hex" viewBox="0 0 115.5 100">
            <polygon points="29 0 0 50 29 100 86.51 100 115.5 50 86.51 0 29 0"></polygon>
          </svg>
        </div>
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

  .hex-wrapper {
    display: flex;
    align-items: center;
    height: 100px;
    justify-content: center;
    margin: 0 -14.5px;
    position: relative;
    width: 115.5px;
  }

  .hex-wrapper.none {
    display: none;
  }

  .hex {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: absolute;
    fill: transparent;
    stroke: transparent;
    stroke-width: 2px;
    cursor: pointer;
  }

  .hex-wrapper.open .hex {
    stroke: #ddd;
  }
</style>
