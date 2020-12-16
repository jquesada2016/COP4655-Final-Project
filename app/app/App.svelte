<script lang="ts">
  import Login from "./components/Login.svelte";
  import Content from "./Pages/mainContent/Content.svelte";
  import { navigate } from "svelte-native";
  import { loginStore } from "./stores";
  import { onMount, tick } from "svelte";
  import ActionBar from "./components/ActionBar.svelte";
  import { FETCH_OPTIONS, URL } from "./constants";

  $: {
    const loggedIn = $loginStore.idToken ? true : false;
    const idToken = $loginStore.idToken;

    if (!loggedIn) {
    }
    const query = `
mutation {
  addNewUser(
    idToken: "${idToken}"
  ) {
    user {
      idToken
    }
    errors {
      field
      message
      errorCode
    }
  }
}

    `;

    if (loggedIn) {
      registerUser(query);
    }
  }

  async function registerUser(query: string) {
    const res = await fetch(URL, {
      ...FETCH_OPTIONS,
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log(data);

    navigate({ page: Content });
  }
</script>

<page>
  <ActionBar />

  <stackLayout>
    <Login />
  </stackLayout>
</page>
