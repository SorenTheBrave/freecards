<script lang="ts">
	import FeaturedGames from '../lib/FeaturedGamesDisplay.svelte';
	import { fade } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import type { GameDisplay } from '../types/types';
	import Favorite from '$lib/Favorite.svelte';
	const existingFavorites = browser ? localStorage?.getItem('favorites') || '' : '';
	export const favorites: Writable<string[]> = writable(existingFavorites?.split(';') || []);

	favorites.subscribe((value) => {
		if (browser) {
			value = value.filter((g) => g.length);
			localStorage.setItem('favorites', (value || []).join(';'));
		}
	});

	// TODO: stub for now, but eventually fetch the 5 featured games (or player favorites) from API
	function getFeaturedGames(): GameDisplay[] {
		return [
			{
				name: 'Hearts',
				code: 'hearts',
				type: 'trick-based',
				tags: ['trick', 'multiplayer'],
				description:
					'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
			},
			{
				name: 'Klondike Solitaire',
				code: 'klondike',
				type: 'solitaire',
				tags: ['solitaire', 'singleplayer'],
				description:
					'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
			},
			{
				name: 'Nertz',
				code: 'nertz',
				type: 'solitaire',
				tags: ['solitaire', 'multiplayer'],
				description:
					'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
			},
			{
				name: 'Poker',
				code: 'poker',
				type: 'betting',
				tags: ['betting', 'multiplayer'],
				description:
					'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
			},
			{
				name: 'Skull',
				code: 'skull',
				type: 'deception',
				tags: ['deception', 'multiplayer', 'social'],
				description: 'Bluff your way to victory in this social deception game.'
			}
		];
	}

	function getAllGames(): GameDisplay[] {
		return [
			{
				name: 'Hearts',
				code: 'hearts',
				type: 'trick-based',
				tags: ['trick', 'multiplayer'],
				description:
					'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
			},
			{
				name: 'Spades',
				code: 'spades',
				type: 'trick-based',
				tags: ['trick', 'multiplayer'],
				description:
					'A golf-scoring type trick game where you bet how many tricks you will win, and the goal is to win as close to as many trick as the bet.'
			},
			{
				name: 'Klondike Solitaire',
				code: 'klondike',
				type: 'solitaire',
				tags: ['solitaire', 'singleplayer'],
				description:
					'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
			},
			{
				name: 'Nertz',
				code: 'nertz',
				type: 'solitaire',
				tags: ['solitaire', 'multiplayer'],
				description:
					'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
			},
			{
				name: 'Poker',
				code: 'poker',
				type: 'betting',
				tags: ['betting', 'multiplayer'],
				description:
					'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
			},
			{
				name: "Texas Hold 'em",
				code: 'texasholdem',
				type: 'betting',
				tags: ['betting', 'multiplayer'],
				description:
					'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
			},
			{
				name: 'Euchre',
				code: 'euchre',
				type: 'trick',
				tags: ['trick', 'multiplayer'],
				description:
					'A 2v2 trick taking game where trump suit is chosen each round. Win all 5 tricks or "go solo" to win extra points!'
			},
			{
				name: 'Skull',
				code: 'skull',
				type: 'deception',
				tags: ['deception', 'multiplayer', 'social'],
				description: 'Bluff your way to victory in this social deception game.'
			},
			{
				name: 'Blackjack',
				code: 'blackjack',
				type: 'betting',
				tags: ['betting', 'multiplayer'],
				description: 'Score as close to 21 as possible without going over. Aces high or low.'
			},
			{
				name: 'Rummy',
				code: 'ginrummy',
				type: 'highscoring',
				tags: ['multiplayer'],
				description:
					'Take turns drawing cards. Build pairs or runs to get the highest scoring hand!'
			}
		];
	}

	const createGame = (name: string) => {
		console.log('Created game ', name, '!');
	};

	const playGame = (name: string) => {
		console.log('Solo game ', name, '!');
	};

	const joinGame = (name: string) => {
		console.log('Join game ', name, '!');
	};

	const featuredGames = getFeaturedGames().map((g) => {
		return {
			...g,
			favorited: existingFavorites?.includes(g.code)
		};
	});
	const allGames = getAllGames().map((g) => {
		return {
			...g,
			favorited: existingFavorites?.includes(g.code)
		};
	});

  // Track state in the typeahead. -1 = no suggestion selected, >= 0 is selected's position
  let focusedSuggestion = -1;
  const captureKeys = ["ArrowUp","ArrowDown","Enter"];
  const inputKeyPress = (e: KeyboardEvent) => {
    if(searchParam.trim()=='') {
      resetSuggestion();
      return;
    }
    if(captureKeys.includes(e.key)){
      e.preventDefault();
      switch(e.key){
        case "ArrowUp":
          if(focusedSuggestion <= 0) {
            focusedSuggestion = filteredGames.length-1;
          } else {
            focusedSuggestion--;
          }
          break;
        case "ArrowDown":
          if(focusedSuggestion == filteredGames.length-1) {
            focusedSuggestion = 0;
          }else{
            focusedSuggestion++;
          }
          break;
        case "Enter":
          searchParam = filteredGameNames[focusedSuggestion];
          break;
        default:
      }
      viewSuggestion(focusedSuggestion);
    }
  }

  const viewSuggestion = (suggestion: number) => {
    const container = document.querySelector("div#game-suggestions");
    const elem = document.querySelector("div#game-suggestions div.search-result[aria-selected=true]");
    if(!elem) return;
    container?.scroll({
      top: suggestion * elem.clientHeight
    });
  }
  const resetSuggestion = () => { focusedSuggestion = -1; }

  const addTagToSearch = (tag: string): void => {
    if(searchParam.includes(tag)) return;
    searchParam = (searchParam.trim() + ` #${tag}`).trim();
  }

  const filterSearchResults = (search: string): GameDisplay[] => {
    if(search.replaceAll('#','').trim().length < 1) return allGames;
    const allSearchTokens = search.split(' ');

    return allGames.filter((game)=> {
      return allSearchTokens.every((token) => {
        token = token.toLowerCase();
        if(token.startsWith("#")) {
          return game.tags.some((tag) => tag.startsWith(token.substring(1)));
        }
        return (
            game.tags.some((tag) => tag.startsWith(token)) ||
            game.name.toLowerCase().includes(token)
          );
      });
    });
  }

	let favoriteGames: GameDisplay[] = [];
	let searchParam = '';
	$: filteredGames = filterSearchResults(searchParam).sort((a,b) => a.name >= b.name ? 1 : -1);
	$: filteredGameNames = filteredGames.map((game) => game.name);
	$: displaysuggestions = filteredGames.length < allGames.length;
	$: favoriteGames = allGames.filter((game) => game.favorited).sort((a,b) => a.name > b.name ? 1 : -1).slice(0,7);
</script>

<div id="single-column">
	<section>
		{#if favoriteGames?.length}
			<h1>Favorite Games</h1>
			<FeaturedGames games={favoriteGames} selectTag={addTagToSearch}/>
		{:else if existingFavorites.length < 2 && featuredGames.length}
			<h1>Featured Games</h1>
			<FeaturedGames games={featuredGames} selectTag={addTagToSearch}/>
		{/if}
	</section>
	<section id="browse">
		<input
			id="game-search"
			type="text"
			title="Search"
			role="combobox"
			spellcheck="false"
			aria-label="Search games"
			aria-expanded={displaysuggestions}
			aria-controls="game-suggestions"
			aria-haspopup="listbox"
			aria-activedescendant="game-suggestions"
			aria-autocomplete="list"
			placeholder="🔎 Search games"
			on:blur={resetSuggestion}
			on:keydown={inputKeyPress}
			bind:value={searchParam}
		/>
		{#if displaysuggestions}
			<div id="game-suggestions" role="listbox">
				{#each filteredGameNames as suggestion, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						on:click={() => (searchParam = suggestion)}
						id="suggestion-{suggestion}"
						role="option"
						aria-selected={index == focusedSuggestion}
						class="search-result"
					>
						{suggestion}
					</div>
				{/each}
			</div>
		{/if}
		<div id="results">
			{#each filteredGames as game (game.name)}
				<div
					class="game-display-card"
					aria-label={game.name}
					aria-describedby="{game.name}-description"
					transition:fade={{ duration: 100 }}
				>
					<div class="game-display-content">
						<div class="result-header">
              <div class="game-display-title">
                <Favorite checked={game.favorited} game={game.code} id="result-{game.code}" --scale="0.7"/>
                <span class="game-display-header">{game.name}</span>
              </div>
						</div>
						<div class="launch-buttons">
							<button on:click={() => createGame(game.name)} class="create-btn">CREATE</button>
							<button on:click={() => playGame(game.name)} class="play-btn">PLAY</button>
							<button on:click={() => joinGame(game.name)} class="join-btn">JOIN</button>
						</div>
						<div class="game-tags">
							{#each game.tags as tag}
                <a 
                  href="#results"
                  on:click={(_e) => addTagToSearch(tag)}
                  on:keydown={(e)=>["Space","Enter"].includes(e.key) ? addTagToSearch(tag) : false}
                  class="tag tag-{tag}">#{tag}
                </a>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">

	div.game-tags {
		max-width: 95%;
		margin: 0.25rem auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	a.tag {
		font-style: italic;
		color: #333;
		padding: 0 0.25rem;
    text-decoration: none;

    &:hover {
      color: rgb(140, 180, 255);
    }
	}

	* {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h1 {
		display: none;
	}

	input {
		text-align: center;
	}

  div.game-display-title{
    display: flex;
    flex-grow: 1;
  }

	@media screen and (max-width: 1100px) {
		input#game-search {
			margin-top: 5rem !important;
		}
	}

	input#game-search {
		font-size: 200%;
		height: 2rem;
		border-radius: 10px;
		font-weight: 600;
		padding: 0.5rem;
		width: clamp(18rem, 80%, 100%);
		margin: 0 auto;
		background-color: #f7f7ff;

		&:has(+ div#game-suggestions) {
			border-radius: 10px 10px 0 0;
		}
	}

	div#game-suggestions {
		max-height: 8rem;
		overflow-y: auto;
		width: clamp(18rem, 81.5%, 100%);
		margin: 0 auto;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	section#browse {
		display: grid;
		margin: 2rem 0;
	}

	div#single-column {
		margin: -2.5rem auto 0;
	}

	div.search-result {
    overscroll-behavior-y: none;
    width: clamp(18rem, 80%, 100%);
		height: 2rem;
		background-color: white;
		text-align: center;
		font-weight: bold;
		font-size: 1.25em;

		&:hover {
			background-color: blanchedalmond;
			cursor: pointer;
		}

    &[aria-selected=true]{
      background-color: peachpuff !important;
    }
	}

	div#results {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 3rem auto;
		min-height: 30rem;
		width: clamp(18rem, 90%, 100%);
	}

	div.launch-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
		gap: 0.45rem;
    margin: 0 auto;
	}

	div.launch-buttons button {
		font-size: 1.25rem;
		cursor: pointer;
		border: 2px solid black;
		border-radius: 5px;
	}

	button.create-btn {
		background-color: hsl(183, 81%, 48%);

		&:hover {
			background-color: hsl(183, 81%, 65%);
		}
	}

	button.play-btn {
		background-color: hsl(44, 98%, 62%);

		&:hover {
			background-color: hsl(44, 98%, 75%);
		}
	}

	button.join-btn {
		background-color: hsl(345, 100%, 74%);

		&:hover {
			background-color: hsl(345, 100%, 85%);
		}
	}

	div.game-display-card {
		display: flex;
    justify-content: center;
		background-color: white;
		border: 1px solid black;
		border-radius: 10px;
		margin: 0.25rem;
		padding: 0.75rem;
		max-height: 10rem;
    width: 19.5rem;
		box-shadow: 2px 2px 5px #222;

		div.game-display-content {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			div.result-header {
        margin: 0 auto;

        span.game-display-header {
          font-size: 1.75rem;
          font-weight: bolder;
          flex-grow: 0.5;
          padding-bottom: 0.25rem;
			  }
      }
		}
	}
</style>
