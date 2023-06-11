<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let data;
  $: transition = {
    in: data.direction == "forward" ? 500 : -500,
    out: data.direction == "forward" ? -500 : 500,
  }
</script>
<nav>

</nav>
<div id="layout-container">
{#key data.url}
  <div
    in:fly={{ x: transition.in, delay: 250 }}
    out:fly={{ x: transition.out, duration: 250, easing: quintOut}}
    id="transition-container"
    >
    <slot></slot>
  </div>
{/key}
</div>

<style>
  div#layout-container {
    overflow-x: hidden;
  }
  div#transition-container {
    overflow-x: hidden;
  }
  nav {
    height: 5vh;
  }
</style>