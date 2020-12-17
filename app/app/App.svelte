<script lang="ts">
  import Login from "./components/Login.svelte";
  import Content from "./Pages/mainContent/Content.svelte";
  import { navi } from "@nativescript/core/ui";
  import { loginStore } from "./stores";
  import ActionBar from "./components/ActionBar.svelte";
  import { FETCH_OPTIONS, URL } from "./constants";
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";
  import { navigate } from "svelte-native";
  import { tick } from "svelte";

  let loggedIn = false;

  loginStore.subscribe(async (val) => {
    loggedIn = val.idToken ? true : false;
    console.log("logged in");
    if (loggedIn) {
      navigateContent();

      // Login/Register user with the DB
      const query = `
mutation {
  addNewUser(
    idToken: "${val.idToken}"
    name: "${getString("name")}"
    pictureUrl: "${getString("picture")}"
  ) {
    user {
      id
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

      // Send request
      const res = await fetch(URL, {
        ...FETCH_OPTIONS,
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      console.log(data);
      const id = data.data.addNewUser.user && data.data.addNewUser.user.id;
      if (id) setString("id", id);
    }
  });

  async function navigateContent() {
    await tick();
    console.log("got past the tick");
    navigate({ page: Content });
    console.log("got past the navigate");
  }
</script>

<page>
  <ActionBar />

  <stackLayout>
    <Login />
    <button on:tap={navigateContent}>navigate</button>
  </stackLayout>
</page>
