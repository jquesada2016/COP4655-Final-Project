<script lang="ts">
  import Logout from "./components/Logout.svelte";
  import Login from "./components/Login.svelte";
  import Content from "./Pages/mainContent/Content.svelte";
  import Register from "./Pages/Register.svelte";

  import { navigate } from "svelte-native";
  import { loginStore } from "./stores";
  import { onMount } from "svelte";

  let registered = true;
  $: loggedIn = $loginStore.idToken ? true : false;

  $: {
    // This is to avoid a bug where navigating too quickly fails
    setTimeout(() => {
      if (loggedIn) navigate({ page: Content });
    }, 0);
  }
</script>

<page>
  <actionBar title="Queara Tasks" />

  {#if registered}
    <Login />
  {:else}
    <Register />
  {/if}
</page>
