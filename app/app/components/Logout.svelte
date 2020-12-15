<script>
  import { loginStore } from "../stores";
  import { setString } from "@nativescript/core/application-settings";
  import { navigate } from "svelte-native";
  import Login from "../App.svelte";

  function logout() {
    // Reset idToken in settings storage
    setString("idToken", "");

    // Set store to propogate changes throuout the app
    loginStore.set({ idToken: "" });

    navigate({ page: Login });
  }
</script>

<button
  on:tap={logout}
  class="-rounded-lg -outline p-x-10 p-y-10"
  borderColor="#e57373">Logout</button>
