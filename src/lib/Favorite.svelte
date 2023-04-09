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
	};
</script>

<div class="favorite">
	<input
		type="checkbox"
		id="favorited-{id}"
		class="favorited"
    role="switch"
    aria-checked="{checked}"
		{checked}
		on:change={(_evt) => toggleFavorite(game)}
	/>
  <label for="favorited-{id}" class="sr-only"></label>
</div>

<style lang="scss">
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
	div.favorite input[type='checkbox'] + label::before {
		content: url('/images/star_outline.svg');
    transform: scale(var(--scale));
	}
	div.favorite input[type='checkbox']:checked + label::before {
		content: url('/images/star_filled.svg');
    transform: scale(var(--scale));
	}
</style>
