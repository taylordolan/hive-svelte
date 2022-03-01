<script>
  export let player; // instance needs to know whether to modify black or white player
  import { holding } from './stores.js';

  const setHeldBug = (bugGroup) => {
    const bugType = bugGroup[0];
    if (!$holding && player.bugs[bugType] > 0) {
      $holding = player.color + " " + bugType;
      player.bugs[bugType]--;
    }
  }

  const renderButtonText = (bugGroup) => {
    const bugType = bugGroup[0];
    const bugCount = bugGroup[1];
    return bugCount + " " + player.color + " " + bugType
  }
</script>

<div id={player.color} class="player">
  {#each Object.entries(player.bugs) as bugGroup}
  <button on:click={setHeldBug(bugGroup)}>
    {renderButtonText(bugGroup)}
  </button>
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
