<script>
  import { loginStore } from "../stores";
  import { setString } from "tns-core-modules/application-settings";
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

<gridLayout>
  <label text="Profile" class="h2 text-center" />
  <button on:tap={logout}>Logout</button>
</gridLayout>
