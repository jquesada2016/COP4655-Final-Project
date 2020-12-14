<script lang="ts">
  import { confirm } from "@nativescript/core/ui/dialogs";
  import { getString, clear } from "@nativescript/core/application-settings";
  import { registeredStore, loginStore } from "../stores";
  import { mutation } from "gql-query-builder";
  import { navigate } from "svelte-native";

  import Login from "../App.svelte";

  async function unregister() {
    confirm(
      "Are you sure you want to permanently delete your account and ALL tasks?"
    ).then(async (res) => {
      console.log(res);
      if (res) {
        const url = "http://192.168.0.10:8000/graphql";
        const query = `
mutation {
  removeUser(id: "${getString("id")}") {
    user {
      idToken
    }
    errors {
      message
    }
  }
}
`;

        const res = await fetch(url, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query }),
        });

        try {
          const data = await res.json();
          console.log(data);

          if (data.data.removeUser.errors) {
            alert("An error has occurred");
            return;
          }

          // Clear application settings data and go to login screen.
          registeredStore.set(false);
          loginStore.set({ idToken: "" });
          navigate({ page: Login });
          loginStore.set({ idToken: "" });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
</script>

<button class="bg-danger -rounded-lg" on:tap={unregister}>Delete Account</button>
