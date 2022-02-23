<script>
  export let player;
  import { holding } from './stores.js';

  const setHeldBug = (player, bug) => {
    if (!$holding && player.bugs[bug]) {
      player.bugs[bug]--;
      $holding = bug;
    }
  }
</script>

<div id={player.color} class="player">
  {#each Object.entries(player.bugs) as bug}
    <button on:click = {() => {
      setHeldBug(player, bug[0]);
      player = player;
    }
    }>{bug[1]} {player.color} {bug[0]}</button>
  {/each}
</div>

<style>
  #white {
    top: 0;
  }

  #black {
    bottom: 0;
  }

  .player {
    align-items: center;
    background-color: rgba(255,255,255,.8);
    display: flex;
    height: 100px;
    justify-content: center;
    position: fixed;
    width: 100vw;
  }
</style>
