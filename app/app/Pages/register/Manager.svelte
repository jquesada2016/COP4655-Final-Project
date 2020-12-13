<script lang="ts">
  import ActionBar from "../../components/ActionBar.svelte";
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";
  import { mutation } from "gql-query-builder";

  let company = "";

  async function submitData() {
    if (company) {
      const url = "http://192.168.0.10:8000/graphql";
      const query = `
      mutation {
  addNewUser(manager: true, company: "${company}", idToken: "${getString(
        "idToken"
      )}") {
    user {
      id
      email
    }
  }
}

      `;

      try {
        const res = await fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        console.log(data);

        const id = data.data.addNewUser.user.id;
        const email = data.data.addNewUser.user.email;

        setString("id", id);
        setString("email", email);

        console.log("storage id: " + getString("id"));
        console.log("storage email: " + getString("email"));
      } catch (e: Error) {
        console.log(e);
      }
    }
  }
</script>

<page>
  <ActionBar back />

  <stackLayout>
    <label class="h1" textAlignment="center">Manager</label>

    <stackLayout class="nt-form m-t-20">
      <stackLayout class="nt-input">
        <label returnKeyType="next">Please enter your company's name *</label>
        <textField hint="Company Name *" class="-border" bind:text={company} />
      </stackLayout>

      <button
        class="-rounded -outline m-t-20"
        on:tap={submitData}>Continue</button>
    </stackLayout>
  </stackLayout>
</page>
