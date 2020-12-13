<script lang="ts">
  import {
    setString,
    setBoolean,
  } from "@nativescript/core/application-settings";
  import { registeredStore, loginStore } from "../stores";

  function unregister() {
    registeredStore.set(false);
    setBoolean("registered", false);

    setString("idToken", "");
    loginStore.set({ idToken: "" });
  }
</script>

<button class="bg-danger -rounded-lg" on:tap={unregister}>Delete Account</button>
