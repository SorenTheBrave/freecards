<script lang=ts>
  import FeaturedGames from "../lib/FeaturedGamesDisplay.svelte";
  import { fly } from 'svelte/transition';

  type GameSelection = {
    name: string,
    type: string,
    description: string,
    tags: string[],
    favorited?: boolean,
  }

    // TODO: stub for now, but eventually fetch the 5 featured games (or player favorites) from API
  function getFeaturedGames(): GameSelection[]{
    return [
      {
        name: 'Hearts',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
      },
      {
        name: 'Klondike Solitaire',
        type: 'solitaire',
        tags: ['solitaire','singleplayer'],
        description: 'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
      },
      {
        name: 'Nertz',
        type: 'solitaire',
        tags: ['solitaire','multiplayer'],
        description: 'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
      },
      {
        name: 'Poker',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Skull',
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

  // stub for now, but eventually check cookies for saved games and update them as users
  // star cards on this page
  function getFavoriteGames(): GameSelection[] {
    return [];
  }

  function getAllGames(): GameSelection[] {
    return [
      {
        name: 'Hearts',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where the goal is to get your opponents to take all of your heart cards (each 1 point)! Watch out, the queen of spades is worth 13 points!'
      },
      {
        name: 'Spades',
        type: 'trick-based',
        tags: ['trick','multiplayer'],
        description: 'A golf-scoring type trick game where you bet how many tricks you will win, and the goal is to win as close to as many trick as the bet.'
      },
      {
        name: 'Klondike Solitaire',
        type: 'solitaire',
        tags: ['solitaire','singleplayer'],
        description: 'The classic solitaire experience. Empty your deck by layering all your cards of descending value and opposite color to win!'
      },
      {
        name: 'Nertz',
        type: 'solitaire',
        tags: ['solitaire','multiplayer'],
        description: 'A competitive and speedy game where each player deals their own game of Klondike solitaire, but you all share all the aces! Who will be first to clear their deck...?'
      },
      {
        name: 'Poker',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Texas Hold \'em',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'A betting game where players buy in, raise stakes, and more cards are revealed as rounds progress. For each hand, winner takes the pot.'
      },
      {
        name: 'Euchre',
        type: 'trick',
        tags: ['trick','multiplayer'],
        description: 'A 2v2 trick taking game where trump suit is chosen each round. Win all 5 tricks or "go solo" to win extra points!'
      },
      {
        name: 'Skull',
        type: 'deception',
        tags: ['deception','multiplayer','social'],
        description: 'Bluff your way to victory in this social deception game.'
      },
      {
        name: 'Blackjack',
        type: 'betting',
        tags: ['betting','multiplayer'],
        description: 'Score as close to 21 as possible without going over. Aces high or low.'
      },
      {
        name: 'Rummy',
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

  const games = getFeaturedGames();
  const favorites = getFavoriteGames();
  const allGames = getAllGames();

  $: searchParam = "";
  $: filteredGames = allGames.filter((game) => game.name.toLowerCase().includes(searchParam.toLowerCase()));
  $: filteredGameNames = filteredGames.length === allGames.length ? [] : filteredGames.map((game) => game.name);
  $: displaysuggestions = filteredGameNames.length > 0;
</script>
<div id="single-column">
  <section>
    {#if favorites.length}
      <h1>Favorite Games</h1>
      <FeaturedGames games={favorites}></FeaturedGames>
    {:else}
      <h1>Featured Games</h1>
      <FeaturedGames {games}></FeaturedGames>
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
      {#each filteredGames as game}
      <div class="game-display-card" aria-label="{game.name}" aria-describedby="{game.name}-description" transition:fly>
        <img alt="palceholder icon" src="images/icon.png" class="display-game-icon">
        <div class="game-display-header">{game.name}</div>
        <div class="launch-buttons">
          <button on:click="{() => createGame(game.name)}" class="create-btn">Create</button>
          <button on:click="{() => playGame(game.name)}" class="play-btn">Play</button>
          <button on:click="{() => joinGame(game.name)}" class="join-btn">Join</button>
        </div>
      </div>
      {/each}
    </div>
  </section>
</div>

<style lang="scss">
  *{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  h1{
    margin-bottom: 0;
    font-size: 3em;
  }

  h1,input{
    text-align: center;
  }

  input#game-search{
    font-size: 200%;
    height: 2rem;
    border-radius: 10px;
    font-weight: 600;
    padding: 0.5rem;
    width: clamp(18rem, 80%, 100%);
    margin: 0 auto;

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
    margin: 2rem;
  }
  
  div#single-column{
    max-width: 85%;
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
    width: clamp(18rem, 80%, 100%);
  }

  img.display-game-icon{
    max-width: 5rem;
    max-height: 5rem;
    margin: 0 auto;
    display: inherit;
  }

  div.launch-buttons{
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.45rem;
    margin-top: auto;
  }

  div.launch-buttons button{
    font-size: 1.5rem;
    cursor: pointer;
    border: 2px solid black;
    border-radius: 5px;
  }

  button.create-btn{
    background-color: hsl(108, 100%, 51%);

    &:hover{
      background-color: hsl(108, 100%, 45%);
    }
  }

  button.play-btn{
    background-color: hsl(288, 84%, 38%);
    color: white;

    &:hover{
      background-color: hsl(288, 84%, 28%);
    }
  }

  button.join-btn{
    background-color: hsl(170, 100%, 57%);

    &:hover{
      background-color: hsl(170, 100%, 40%);
    }
  }

  div.game-display-card{
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0.25rem; 
    padding: 0.75rem;
    max-height: 10rem;
    box-shadow: 2px 2px 5px #222;

    div.game-display-header{
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
    }
  }
</style>