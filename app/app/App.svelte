<script lang="ts">
  import Logout from "./components/Logout.svelte";
  import Login from "./components/Login.svelte";
  import Content from "./Pages/mainContent/Content.svelte";
  import Register from "./Pages/register/Register.svelte";

  import { navigate } from "svelte-native";
  import { loginStore } from "./stores";
  import { onMount } from "svelte";
  import ActionBar from "./components/ActionBar.svelte";

  let registered = false;
  $: loggedIn = $loginStore.idToken ? true : false;

  $: {
    // This is to avoid a bug where navigating too quickly fails
    setTimeout(() => {
      if (loggedIn && registered) navigate({ page: Content });
    }, 0);
  }
</script>

<page>
  <ActionBar />

  {#if registered}
    <Login />
  {:else}
    <Register />
  {/if}
</page>
