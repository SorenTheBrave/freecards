<script lang="ts">
  // create the ws connection here
  // ws.on(message) => print the message in the <ul>
  
  // ws.send() => the contents of the chat value
  function sendMessage() {

  }
</script>
<div>
  <ul id="messages"></ul>
  <input id="chat" type="text" placeholder="Type a message..."/>
  <button on:click={sendMessage}>send</button>
</div>