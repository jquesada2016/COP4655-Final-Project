<script>
  import { closeModal } from "svelte-native";

  let value;
</script>

<page>
  <flexBoxLayout margin="20" height="90%" width="95%" flexDirection="column">
    <label>The value is {value}</label>
    <textField hint="type something..." margin="0" bind:text={value} />
    <button on:tap={() => closeModal()}>cancel</button>
  </flexBoxLayout>
</page>
