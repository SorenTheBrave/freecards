<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let data;
  $: transition = {
    in: data.direction == "forward" ? 500 : -500,
    out: data.direction == "forward" ? -500 : 500,
  }
</script>
<div id="layout-container">
{#key data.url}
  <div
    in:fly={{ x: transition.in, delay: 250 }}
    out:fly={{ x: transition.out, duration: 250, easing: quintOut}}
    id="transition-container"
    >
    <slot></slot>
  </div>
  {#if data.url == "/"}
    <footer>
      Concept and web development by Alex Hansen. Site design by Emi Kay. FreeCards does not and never will charge you, track you, or ask for your personal information.
    </footer>
  {/if}
{/key}
</div>

<style>
  div#layout-container {
    overflow-x: hidden;
    min-height: calc(100vh - 3rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  div#transition-container {
    overflow-x: hidden;
  }
  footer {
    background-color: #222;
    color: #f7f7ff;
    font-size: 1rem;
    max-height: 2rem;
    padding: 0.5rem;
    text-align: center;
  }
</style>