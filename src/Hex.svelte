<script>
  export let x;
  export let y;
  export let status;
  export let content;
</script>

<div class="hex-wrapper {status}" data-x={x} data-y={y}>
  <svg class="hex" viewBox="0 0 115.5 100">
    <polygon points="29 0 0 50 29 100 86.51 100 115.5 50 86.51 0 29 0"></polygon>
  </svg>
</div>

<style>
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
