<script lang="ts">
  import Logout from "./components/Logout.svelte";
  import Login from "./components/Login.svelte";
  import Content from "./Pages/mainContent/Content.svelte";
  import Register from "./Pages/register/Register.svelte";

  import { navigate } from "svelte-native";
  import { loginStore, registeredStore } from "./stores";
  import { onMount, tick } from "svelte";
  import ActionBar from "./components/ActionBar.svelte";

  $: registered = $registeredStore;

  $: loggedIn = $loginStore.idToken ? true : false;

  $: {
    // This is to avoid a bug where navigating before components can mount fails
    const delayNavigation = async () => {
      await tick();
      if (loggedIn && registered) navigate({ page: Content });
    };
    delayNavigation();
  }
</script>

<page>
  <ActionBar />

  {#if registered || !loggedIn}
    <Login />
  {:else}
    <Register />
  {/if}
</page>
