<script lang="ts">
  import TabStrip from "./components/TabStrip.svelte";
  import MyTasks from "./components/MyTasks.svelte";
  import { onMount } from "svelte";
  import { loginStore } from "./stores";
  import Logout from "./components/Logout.svelte";
  import Login from "./components/Login.svelte";

  let loggedIn = false;

  $: loggedIn = $loginStore.idToken ? true : false;
</script>

<page>
  <actionBar title="Queara Tasks" />

  {#if loggedIn}
    <label class="h1">This is a test</label>
    <bottomNavigation>
      <TabStrip />
      <tabContentItem>
        <MyTasks />
      </tabContentItem>
      <tabContentItem>
        <gridLayout>
          <label class="h2 text-center">Assigned Tasks</label>
        </gridLayout>
      </tabContentItem>
      <tabContentItem>
        <Logout />
      </tabContentItem>
    </bottomNavigation>
  {:else}
    <Login />
  {/if}
</page>
