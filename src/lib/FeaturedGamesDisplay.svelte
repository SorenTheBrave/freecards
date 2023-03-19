<script lang=ts>
  import {fly} from 'svelte/transition';

  // default to something embarassing just for now
  export let games = [{
      name: 'Awkward',
      type: 'nope',
      tags: ['oops','siolly','coder'],
      description: 'Well this isn\'t quite right...'
    }];

  const createGame = (name: string) => {
    console.log("Created game ",name,"!");
  }

  const playGame = (name: string) => {
    console.log("Solo game ",name,"!");
  }
  
  const joinGame = (name: string) => {
    console.log("Join game ",name,"!");
  }

</script>

<div id="games-display">
  {#each games as game}
    <div class="game-display-card hand-of-{games.length}" aria-label="{game.name}" aria-describedby="{game.name}-description"transition:fly>
      <img alt="placeholder icon" src="images/icon.png" class="display-game-icon">
      <h2 class="game-display-header">{game.name}</h2>
      <p class="description {game.name}-description">{game.description}</p>
      <div class="launch-buttons">
        <button on:click="{() => createGame(game.name)}" class="create-btn">Create</button>
        <button on:click="{() => playGame(game.name)}" class="play-btn">Play</button>
        <button on:click="{() => joinGame(game.name)}" class="join-btn">Join</button>
      </div>
      <div class="game-display-footer">
        {#each game.tags as tag}
          <span class="tag tag-{tag}">{tag}</span>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">

img.display-game-icon{
  max-width: 5rem;
  max-height: 5rem;
  margin: 0 auto;
  display: inherit;
}

p.description{
  display: none;
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

@media screen  and (min-width: 600px){
  div#games-display{
    min-height: 30rem;
  }
}

div#games-display{
  margin: 0 auto;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  div.game-display-card{
    aspect-ratio: 88 / 62;
    position: relative;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    margin: 0.25rem; 
    padding: 0.75rem;
    user-select: none;
    max-height: 10rem;
    box-shadow: 2px 2px 5px #222;

    div.game-display-header{
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
    }

    div.game-display-footer{
      display: none;
    }
  }

  span.tag{
    border: 2px solid black;
    border-radius: 5px;
    margin: 0 0.25rem;
    padding: 0.2rem;
    cursor: default;

    &.tag-singleplayer{
      color: white;
      background-color: $tag-single;
    }

    &.tag-multiplayer{
      color: white;
      background-color: $tag-multi;
    }

    &.tag-trick{
      color: white;
      background-color: $tag-trick;
    }

    &.tag-solitaire{
      background-color: $tag-solitaire;
    }

    &.tag-betting{
      color: white;
      background-color: $tag-betting;
    }

    &.tag-social{
      background-color: $tag-social;
    }

    &.tag-deception{
      background-color: $tag-deception;
    }
  }

  // /*
  //   Transform rules to make cards look like they're fanned out as if   
  //   held in a hand. One sass loop per hand size, should be in range 1-7
  //
  // */

  .game-display-card:hover {
    z-index: 101;
  }

  // FORMULA for each card $i in a hand 1..$total, the vertical offset (postivie y is down) is: 
  //
  // ODD: -(($total + 1) / 2) + $i
  //
  // EVEN: Math.abs($i - ($total / 2 + 0.5)) - 0.5
  // try the formulas out yourself by hand to see how this works! it was fun to figure out

  // .hand-of-1 - no static effect, the card is already centered. just move up on hover 
  :where(&) .game-display-card.hand-of-1:hover,
  :where(&) .game-display-card.hand-of-1:focus-within {
    transition: all 0.1s linear;
    translate: 0 -1rem;
  }

  @media screen  and (min-width: 600px){
    .game-display-card.hand-of-2 {
      position: absolute;
      aspect-ratio: 62 / 88;
      width: 250px;
      flex-direction: column;
      max-height: 23rem;
      display: inline-flex;

      & p.description{
        display: block;
        text-align: center;
      }
    }
    // .hand-of-2 - no vertical offset
    @for $i from 1 through 2 {
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-2 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 75%) - 112.5%);
        rotate: calc(calc(calc($i - 2)  * 6deg) + 3deg);
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-2:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-2:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 75%) - 112%) -1rem;
        rotate: calc(calc(calc($i - 2)  * 6deg) + 3deg);
        z-index: 100;
      }
    }
  }

  @media screen  and (min-width: 900px){
    @for $i from 1 through 3 {
      $total: 3;
      $offset: calc(calc(($total + 1) / -2) + $i);

      .game-display-card.hand-of-3 {
        position: absolute;
        aspect-ratio: 62 / 88;
        width: 250px;
        flex-direction: column;
        max-height: 23rem;
        display: inline-flex;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-3 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 65%) - 130%) calc(abs($offset) * calc(1.5rem * abs($offset)));
        rotate: calc(calc(calc($i - 2)  * 10deg));
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-3:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-3:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 65%) - 130%) calc(abs($offset) * calc(1.5rem * abs($offset)) - 1rem);
        rotate: calc(calc(calc($i - 2)  * 10deg));
        z-index: 100;
      }
    }
  }

  @media screen  and (min-width: 1000px){
    @for $i from 1 through 4 {
      $total: 4;
      $offset: calc(abs(calc($i - calc(($total / 2) + 0.5))) - 0.5);
      
      .game-display-card.hand-of-4 {
        position: absolute;
        aspect-ratio: 62 / 88;  
        width: 250px;
        flex-direction: column;
        max-height: 23rem;
        display: inline-flex;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-4 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 75%) - 187.75%) calc(abs($offset) * calc(2.5rem * abs($offset)));
        rotate: calc(calc(calc($i - 2)  * 11deg) - 5.5deg);
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-4:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-4:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 75%) - 187.75%) calc(abs($offset) * calc(1.5rem * abs($offset)) - 1rem);
        rotate: calc(calc(calc($i - 2)  * 11deg) - 5.5deg);
        z-index: 100;
      }
    }
  }

  @media screen  and (min-width: 1050px){
    @for $i from 1 through 5 {
      $total: 5;
      $offset: calc(calc(($total + 1) / -2) + $i);

      .game-display-card.hand-of-5 {
        position: absolute;
        aspect-ratio: 62 / 88;
        width: 250px;
        flex-direction: column;
        max-height: 23rem;
        display: inline-flex;

        & p.description{
          display: block;
          text-align: center;
        }

        & div.game-display-footer{
          display: block;
          margin-top: 1rem;
        }
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-5 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 55%) - 165%) calc(abs($offset) * calc(1.25rem * abs($offset)));
        rotate: calc(calc(calc($i - 2)  * 12deg) - 12deg);
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-5:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-5:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 55%) - 165%) calc(abs($offset) * calc(1.25rem * abs($offset)) - 1rem);
        rotate: calc(calc(calc($i - 2)  * 12deg) - 12deg);
        z-index: 100;
      }
    }
  }

  @media screen  and (min-width: 1250px){
    @for $i from 1 through 6 {
      $total: 6;
      $offset: calc(abs(calc($i - calc(($total / 2) + 0.5))) - 0.5);

      .game-display-card.hand-of-6 {
        position: absolute;
        aspect-ratio: 62 / 88;
        width: 250px;
        flex-direction: column;
        max-height: 23rem;
        display: inline-flex;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-6 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 60%) - 210%) calc(abs($offset) * calc(1.25rem * abs($offset)));
        rotate: calc(calc(calc($i - 2)  * 11deg) - 15deg);
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-6:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-6:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 60%) - 210%) calc(abs($offset) * calc(1rem * abs($offset)) - 1rem);
        rotate: calc(calc(calc($i - 2)  * 11deg) - 15deg);
        z-index: 100;
      }
    }
  }


  @media screen  and (min-width: 1450px){
    .game-display-card.hand-of-7 {
      position: absolute;
      aspect-ratio: 62 / 88;
      width: 250px;
      flex-direction: column;
      max-height: 23rem;
      display: inline-flex;
    }

    @for $i from 1 through 7 {
      $total: 7;
      $offset: calc(calc(($total + 1) / -2) + $i);

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-7 {
        transition: all 0.1s linear;
        translate: calc(calc($i * 60%) - 242.5%) calc(abs($offset) * calc(.75rem * abs($offset)));
        rotate: calc(calc(calc($i - 2)  * 10deg) - 20deg);
        z-index: $i;
      }

      :where(&) .game-display-card:nth-child(#{$i}).hand-of-7:hover,
      :where(&) .game-display-card:nth-child(#{$i}).hand-of-7:focus-within {
        transition: all 0.1s linear;
        translate:  calc(calc($i * 60%) - 242.5%) calc(abs($offset) * calc(.75rem * abs($offset)) - 1rem);
        rotate: calc(calc(calc($i - 2)  * 10deg) - 18deg);
        z-index: 100;
      }
    }
  }
}

</style>