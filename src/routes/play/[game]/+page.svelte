<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<form action="/play" method="post">
<div id="single-column">
  <h1>Your own game of {data.game}</h1>
    <div class="form-row">
      <div class="form-control">
        <label for="player-name">Player name:</label>
        <input id="player-name" type="text" maxlength="25"/>
      </div>

      <div class="form-control">
        <label for="chat">Enable chat:</label>
        <input id="chat" alt="Enable in-game chat room (text only)" type="checkbox" checked/>
      </div>
  
      <div class="form-control">
        <label for="visibility">Public:</label>
        <input id="visibility" alt="Make room visibly global for all to join" type="checkbox"/>
      </div>
  
      <div class="form-control">
        <label for="mature">Mature content:</label>
        <input id="mature" alt="Chat may contain mature content" type="checkbox"/>
      </div>
    </div>
    <div class="form-row">
      <div class="form-control">
        <label for="enable-cpu">Enable CPU opponents:</label>
        <input id="enable-cpu" type="checkbox" checked/>
      </div>

      <div class="form-control">
        <label for="cpu-count">Number of CPU opponents:</label>
        <input id="cpu-count" alt="Number of CPU" type="number" min="1" max="50" checked/>
      </div>
    </div>

    <div id="game-options" class="form-row">
      <div class="grow">
        <h2> Game specific options</h2>
        <!-- <div id="game-options-list" >
          {#each gameSpecificOptions as option}
            
          {/each} 
        </div> -->
      </div>
      <div class="form-row control-btns">
        <a href="/"><button id="cancel">
          Cancel
        </button></a>
        <input type="submit" id="submit" value="Play">
      </div>
    </div>
</div>
</form>

<style lang="scss">
	div#single-column {
    display: flex;
    flex-direction: column;
    width: clamp(18rem,80%,100%);
    min-height: 85vh;
    margin: 1rem auto;
    background-color: #f7f7ff;
    border-radius: 15px;
    padding: 0.5rem;
    
    h1, h2 {
      text-align: center;
      width: 100%;
    }
    label {
      margin-right: 0.5rem;
    }

    div.grow{
      flex-grow: 1;
    }

    div.form-row {
      display: flex;
      flex-direction: column;
      justify-content: center;

      div.form-control {
        display: inline-flex;
        justify-content: center;
        margin: 0.5rem 0;
      }
    }

    div#game-options{
      height: 70%;
      flex-direction: column;
      flex-grow: 1;
    }

    div.form-row.control-btns {
      flex-direction: row;
      justify-content: space-between;

      a, input, button {
        width: max(10%,8rem);
        height: 3rem;
        border-radius: 5px;
        font-size: larger;

        &:hover{
          cursor: pointer;
        }
      }

      button {
        width: 100%;
        height: 100%;
      }

      input {
        background-color: hsl(120, 100%, 40%);
        border-radius: 5px;

        &:hover{
          background-color: hsl(120, 100%, 35%);
        }
      }
    }

    h2 {
      margin-bottom: 0.25rem;
    }

	}



  @media screen and (min-width: 850px) {
    div#single-column div.form-row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
</style>