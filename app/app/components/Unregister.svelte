<script lang="ts">
  import { confirm } from "@nativescript/core/ui/dialogs";
  import { getString, clear } from "@nativescript/core/application-settings";
  import {
    registeredStore,
    loginStore,
    myTasksStore,
    completedMyTasksStore,
  } from "../stores";
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
  deleteUser(id: "${getString("id")}") {
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
          loginStore.set({ idToken: "" });
          myTasksStore.set([]);
          completedMyTasksStore.set([]);
          clear();
          navigate({ page: Login });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
</script>

<button
  class="-rounded-lg p-x-10 p-y-10"
  borderColor="#e57373"
  backgroundColor="#e57373"
  on:tap={unregister}>Delete Account</button>
