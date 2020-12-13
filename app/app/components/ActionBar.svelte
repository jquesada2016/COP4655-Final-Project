<script>
  import { goBack } from "svelte-native";

  export let back = false;
</script>

<actionBar title="Queara Tasks">
  {#if back}
    <navigationButton
      text="Go Back"
      android.systemIcon="ic_menu_back"
      on:tap={goBack} />
  {/if}
</actionBar>
