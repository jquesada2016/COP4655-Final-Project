<script lang="ts">
  import { confirm } from "@nativescript/core/ui/dialogs";
  import { getString, clear } from "@nativescript/core/application-settings";
  import { loginStore, myTasksStore } from "../stores";
  import { navigate } from "svelte-native";

  import Login from "../App.svelte";
  import { FETCH_OPTIONS, URL } from "../constants";

  async function unregister() {
    confirm(
      "Are you sure you want to permanently delete your account and ALL tasks?"
    ).then(async (res) => {
      console.log(res);
      if (res) {
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

        const res = await fetch(URL, {
          ...FETCH_OPTIONS,
          body: JSON.stringify({ query }),
        });

        try {
          const data = await res.json();
          console.log(data);

          console.log(query);

          if (data.data.deleteUser.errors) {
            alert("An error has occurred");
            return;
          }

          // Clear application settings data and go to login screen.
          console.log("Deleting all data...");
          loginStore.set({ idToken: "" });
          myTasksStore.set([]);
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
