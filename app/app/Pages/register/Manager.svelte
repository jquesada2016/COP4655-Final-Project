<script lang="ts">
  import ActionBar from "../../components/ActionBar.svelte";
  import {
    getString,
    setBoolean,
    setString,
  } from "@nativescript/core/application-settings";
  import { mutation } from "gql-query-builder";
  import { registeredStore } from "../../stores";

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
    errors {
      field
      message
      errorCode
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

        if (data.data.addNewUser.errors) {
          alert(
            "This user is already registered. Please use a didfferent account"
          );
          return;
        }

        const id = data.data.addNewUser.user.id;
        const email = data.data.addNewUser.user.email;

        console.log("id: " + id);
        console.log("email: " + email);

        setString("id", id);
        setString("email", email);
        setString("company", company);
        setBoolean("registered", true);

        console.log("registeredStore: " + JSON.stringify(registeredStore));

        registeredStore.set(true);
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
