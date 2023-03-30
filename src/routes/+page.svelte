<script lang=ts>
  import FeaturedGames from "../lib/FeaturedGamesDisplay.svelte";
  import { fade } from "svelte/transition";
	import { writable, type Writable } from "svelte/store";
  import { browser } from "$app/environment";
  import type { GameDisplay } from "../types/types";
	import Favorite from "$lib/Favorite.svelte";
  const existingFavorites = browser ? localStorage?.getItem('favorites') || "" : "";
  export const favorites: Writable<string[]> = writable(existingFavorites?.split(';') || []);
  // export const ssr = false;
  export const prerender = false;

  favorites.subscribe((value)=> {
    if(browser){
      value = value.filter((g)=>g.length)
      localStorage.setItem('favorites',(value||[]).join(';'));
    }
  });

    // TODO: stub for now, but eventually fetch the 5 featured games (or player favorites) from API
  function getFeaturedGames(): GameDisplay[]{
    return [
      {
        name: 'Hearts',
        code: 'hearts',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
      },
      {
        name: 'Klondike Solitaire',
        code: 'klondike',
        type: 'solitaire',
        tags: ['solitaire','singleplayer'],
        description: 'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
      },
      {
        name: 'Nertz',
        code: 'nertz',
        type: 'solitaire',
        tags: ['solitaire','multiplayer'],
        description: 'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
      },
      {
        name: 'Poker',
        code: 'poker',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Skull',
        code: 'skull',
        type: 'deception',
        tags: ['deception','multiplayer','social'],
        description: 'Bluff your way to victory in this social deception game.'
      },
    ];
  }

  /*
      Functions for managing selected item in the typeahead
  */

  let selectedSuggestion = 0;

  const resetSuggestion = (e: Event | undefined): void => { selectedSuggestion = 0 };
  const suggestionKeyNav = (e: KeyboardEvent): void => {
    switch(e.key){
      case 'ArrowDown':
      e.preventDefault();
        selectedSuggestion++;
        return;
      case 'ArrowUp':
        e.preventDefault();
        selectedSuggestion--;
        return;
      default:
        return;
    }
  };

  function getAllGames(): GameDisplay[] {
    return [
      {
        name: 'Hearts',
        code: 'hearts',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
      },
      {
        name: 'Spades',
        code: 'spades',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where you bet how many tricks you will win, and the goal is to win as close to as many trick as the bet.'
      },
      {
        name: 'Klondike Solitaire',
        code: 'klondike',
        type: 'solitaire',
        tags: ['solitaire','singleplayer'],
        description: 'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
      },
      {
        name: 'Nertz',
        code: 'nertz',
        type: 'solitaire',
        tags: ['solitaire','multiplayer'],
        description: 'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
      },
      {
        name: 'Poker',
        code: 'poker',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Texas Hold \'em',
        code: 'texasholdem',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Euchre',
        code: 'euchre',
        type: 'trick',
        tags: ['trick','multiplayer'],
        description: 'A 2v2 trick taking game where trump suit is chosen each round. Win all 5 tricks or "go solo" to win extra points!'
      },
      {
        name: 'Skull',
        code: 'skull',
        type: 'deception',
        tags: ['deception','multiplayer','social'],
        description: 'Bluff your way to victory in this social deception game.'
      },
      {
        name: 'Blackjack',
        code: 'blackjack',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'Score as close to 21 as possible without going over. Aces high or low.'
      },
      {
        name: 'Rummy',
        code: 'ginrummy',
        type: 'highscoring',
        tags: ['multiplayer',],
        description: 'Take turns drawing cards. Build pairs or runs to get the highest scoring hand!'
      },
    ];
  }

  const createGame = (name: string) => {
    console.log("Created game ",name,"!");
  }

  const playGame = (name: string) => {
    console.log("Solo game ",name,"!");
  }
  
  const joinGame = (name: string) => {
    console.log("Join game ",name,"!");
  }

  const featuredGames = getFeaturedGames().map((g)=> {
    return {
    ...g,
    favorited: existingFavorites?.includes(g.code)
    }
  });
  const allGames = getAllGames().map((g)=> {
    return {
    ...g,
    favorited: existingFavorites?.includes(g.code)
    }
  });

  let favoriteGames: GameDisplay[] = [];
  let searchParam = "";
  console.log(existingFavorites);
  $: filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(searchParam.toLowerCase()));
  $: filteredGameNames = filteredGames.length === allGames.length ? [] : filteredGames.map((game) => game.name);
  $: displaysuggestions = filteredGameNames.length > 0;
  $: favoriteGames = allGames.filter((game)=>game.favorited);
</script>
<div id="single-column">
  <section>
    {#if favoriteGames?.length}
      <h1>Favorite Games</h1>
      <FeaturedGames games={favoriteGames}/>
    {:else if existingFavorites.length < 2 && featuredGames.length}
      <h1>Featured Games</h1>
      <FeaturedGames games={featuredGames}/>
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
      on:keypress={suggestionKeyNav}
      bind:value={searchParam}/>
    {#if displaysuggestions}
      <div id="game-suggestions" role="listbox">
        {#each filteredGameNames as suggestion, index}
          <div on:click={() => searchParam = suggestion} id="suggestion-{suggestion}" role="option" aria-selected={index==selectedSuggestion} class="search-result">{suggestion}</div>
        {/each}
      </div>
    {/if}
    <div id="results">
      {#each filteredGames as game (game.name)}
      <div class="game-display-card" aria-label="{game.name}" aria-describedby="{game.name}-description" transition:fade={{duration:100}}>
        <img alt="placeholder icon" src="/images/icon.png" class="display-game-icon">
        <div class="game-display-content">
          <div class="result-header">
            <span class="game-display-header">{game.name}</span>
            <Favorite checked={game.favorited} game={game.code} id="result-{game.code}"/>
          </div>
          <div class="launch-buttons">
            <button on:click="{() => createGame(game.name)}" class="create-btn">CREATE</button>
            <button on:click="{() => playGame(game.name)}" class="play-btn">PLAY</button>
            <button on:click="{() => joinGame(game.name)}" class="join-btn">JOIN</button>
          </div>
          <div class="game-tags">
            {#each game.tags as tag} 
              <span class="tag tag-{tag}">#{tag}</span>
            {/each}
          </div>
        </div>
      </div>
      {/each}
    </div>
  </section>
</div>

<style lang="scss">

div.result-header{
  display: flex;
  justify-content: space-between;
}

div.game-tags{
  max-width: 95%;
  margin: 0.25rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

span.tag{
  font-style: italic;
  color: #333;
  padding: 0 0.25rem;
}

  *{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  h1{
    display: none;
  }

  input{
    text-align: center;
  }

  @media screen and (max-width: 1100px) {
    input#game-search{
      margin-top: 5rem !important;
    }
  }

  input#game-search{
    font-size: 200%;
    height: 2rem;
    border-radius: 10px;
    font-weight: 600;
    padding: 0.5rem;
    width: clamp(18rem, 80%, 100%);
    margin: 0 auto;
    background-color: #F7F7FF;

    &:has(+ div#game-suggestions){
      border-radius: 10px 10px 0 0;
    }
  }

  div#game-suggestions{
    max-height: 8rem;
    overflow-y: auto;
    width: clamp(18rem, 81.5%, 100%);
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  section#browse{
    display: grid;
    margin: 2rem 0;
  }
  
  div#single-column{
    margin: -2.5rem auto 0;
  }

  div.search-result{
    height: 2rem;
    background-color: white;
    text-align: center;
    font-weight: bold;
    font-size: 1.25em;

    &:hover{
      background-color: blanchedalmond;
      cursor: pointer;
    }
  }

  div#results{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 3rem auto;
    min-height: 30rem;
    width: clamp(18rem, 90%, 100%);
  }

  img.display-game-icon{
    max-width: 5rem;
    max-height: 5rem;
    margin: auto 0;
    display: inherit;
  }

  div.launch-buttons{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    gap: 0.45rem;
  }

  div.launch-buttons button{
    font-size: 1.25rem;
    cursor: pointer;
    border: 2px solid black;
    border-radius: 5px;
  }

  button.create-btn{
    background-color: hsl(183, 81%, 48%);

    &:hover{
      background-color: hsl(183, 81%, 65%);
    }
  }

  button.play-btn{
    background-color: hsl(44, 98%, 62%);

    &:hover{
      background-color: hsl(44, 98%, 75%);
    }
  }

  button.join-btn{
    background-color: hsl(345, 100%, 74%);

    &:hover{
      background-color: hsl(345, 100%, 85%);
    }
  }

  div.game-display-card{
    display: flex;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0.25rem; 
    padding: 0.75rem;
    max-height: 10rem;
    box-shadow: 2px 2px 5px #222;

    div.game-display-content{
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      div.result-header span.game-display-header{
        font-size: 1.5rem;
        font-weight: bolder;
        text-align: center;
        padding-bottom: 0.5rem;
        flex-grow: 1;
      }
    }
  }
</style>