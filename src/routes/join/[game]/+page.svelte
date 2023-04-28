<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<form action="/join" method="post">
<div id="single-column">
  <h1>Join a game of {data.game}</h1>
    <div class="form-row">
      <div class="form-control">
        <label for="player-name">Player name:</label>
        <input id="player-name" type="text" maxlength="25"/>
      </div>
    </div>
    <hr/>
    <div class="form-row">
      <div class="form-control">
        <label for="join-code">Lobby code:</label>
        <input id="join-code" type="text" maxlength="4">
        <input type="submit" formaction="/joinByCode" value="Join">
      </div>
    </div>
    <div id="join-options" class="form-row">
      <div class="grow">
        <h2> Open public games</h2>
        <!-- {#each openGames as game}
          
        {/each} -->
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

    div#join-options{
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

    hr {
      width: 100%;
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