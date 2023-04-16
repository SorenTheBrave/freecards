<script lang="ts">
	import { browser } from '$app/environment';
	export let checked = false;
	export let id = '';
	export let game = '';
	export const toggleFavorite = (game: string) => {
		if (!browser || game.length <= 1) return;
		const allFavorites = localStorage.getItem('favorites')?.split(';') || [];
		if (allFavorites?.includes(game)) {
			localStorage.setItem(
				'favorites',
				allFavorites?.filter((g: string) => g.length == 0 || g !== game).join(';')
			);
		} else {
			localStorage.setItem('favorites', [...(allFavorites || []), game].join(';'));
		}
    _checked = !_checked;
    console.log(game,": ",_checked?"check":"nope");
	};
  let _checked = checked;
</script>

<div class="favorite">
  {#if _checked}
    <img 
      src="/images/star_filled.svg"
      class="favorite-star"
      alt="favorited"
      on:click={(_evt) => toggleFavorite(game)}
      on:keypress={(e)=>["Space","Enter"].includes(e.key) ? toggleFavorite(game) : false}
    />
  {:else}
    <img 
      src="/images/star_outline.svg"
      class="favorite-star"
      alt="not favorited"
      on:click={(_evt) => toggleFavorite(game)}
      on:keypress={(e)=>["Space","Enter"].includes(e.key) ? toggleFavorite(game) : false}
    />
  {/if}
	<input
		type="checkbox"
		id="favorited-{id}"
		class="favorited sr-only"
    role="switch"
    aria-checked="{_checked}"
		checked="{_checked}"
		on:change={(_evt) => toggleFavorite(game)}
	/>
  <label for="favorited-{id}" class="sr-only"></label>
</div>

<style lang="scss">
  input,label.sr-only{
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }
  div.favorite{
    transform: scale(70%);
  }
	div.favorite input[type='checkbox'].favorited {
		opacity: 0;
		position: absolute;
		user-select: none;
	}
	div.favorite input[type='checkbox'].favorited + label {
		display: flex;
		cursor: pointer;
	}
	div.favorite input[type='checkbox']:focus + label::before {
		border-radius: 2px;
	}
</style>
