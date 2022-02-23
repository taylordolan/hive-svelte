<script>
  import Hex from "./Hex.svelte";
  import Player from "./Player.svelte";
  import { board, white, black } from './stores.js';
</script>

<main>
  <Player player={$white}/>
  <Player player={$black}/>
	<div id="board">
    {#each $board as col, x}
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
