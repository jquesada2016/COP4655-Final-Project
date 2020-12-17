<script lang="ts">
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";

  import { BarcodeScanner } from "nativescript-barcodescanner";
  import { FETCH_OPTIONS, URL } from "../constants";
  import { assignableUsersStore } from "../stores/assignableUsers";
  import { assignableUser } from "../types/types";

  export let manager = false;

  function scan() {
    const scanner = new BarcodeScanner();

    scanner
      .scan({
        formats: "QR_CODE",
        cancelLabel: "Cancel", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message:
          "Scan you another user's QR code in order to assign them tasks",
        showFlipCameraButton: true, // default false
        beepOnScan: true, // Play or Suppress beep on scan (default true)
        fullScreen: true, // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
        closeCallback: () => {
          console.log("Scanner closed");
        }, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
        presentInRootViewController: true, // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
      })
      .then(
        (result) => {
          fetchUserName(result.text);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
  }

  async function fetchUserName(userId: string) {
    const query = `
    mutation {
  addAssignableUser(
    userId: "${getString("id")}"
    assigneeId: "${userId}"
  ) {
    id
    name
  }
}

    `;

    // Fetch data
    const res = await fetch(URL, {
      ...FETCH_OPTIONS,
      body: JSON.stringify({ query }),
    });

    const data: any = await res.json();
    console.log(data);

    let assignableUsers: assignableUser[];
    const assignableUsersString = getString("assignableUsers");
    if (assignableUsersString)
      assignableUsers = JSON.parse(assignableUsersString);
    else assignableUsers = [];

    assignableUsers.push(data.data.addAssignableUser);

    assignableUsersStore.set(assignableUsers);
    setString("assignableUsers", JSON.stringify(assignableUsers));

    console.log(assignableUsers);
  }
</script>

<button
  class="-outline -rounded-lg p-x-10 p-y-10"
  on:tap={scan}><slot /></button>
