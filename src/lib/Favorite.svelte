<script lang="ts">
export let checked = true;
export let index = 0;
$: imgSrc = `/images/${checked ? 'star_filled.svg' : 'star_outline.svg'}`;
$: imgClass = checked ? 'favorited' : '';
const toggleChecked = () => checked = !checked;
</script>

<div class="favorite">
  <input type="checkbox" id="favorited-{index}" class="favorited" bind:checked={checked}/>
  <label for="favorited-{index}"></label>
</div>

<style lang="scss">
  div.favorite input[type="checkbox"].favorited {
    opacity: 0;
    position: absolute;
    left: -9001px;
    top: -9001px;
  }
  div.favorite input[type="checkbox"].favorited + label{
    display: flex;
    cursor: pointer;
  }
  div.favorite input[type="checkbox"]:focus + label::before {
    outline: 2px solid rgba(128, 212, 255,80%);
    border-radius: 2px;
  }
  div.favorite input[type="checkbox"] + label::before {
    content: url('/images/star_outline.svg');
  }
  div.favorite input[type="checkbox"]:checked + label::before {
    content: url('/images/star_filled.svg');
  }
  div.favorite{
    position: absolute;
    right: 0.25rem;
  }
</style>