<script lang="ts">
  import { BarcodeScanner } from "nativescript-barcodescanner";

  export let manager = false;

  function scan() {
    const scanner = new BarcodeScanner();

    scanner
      .scan({
        formats: "QR_CODE",
        cancelLabel: "Close", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message:
          "Scan your " + (manager ? "manager's" : "employee's") + " QR code",
        showFlipCameraButton: true, // default false
        preferFrontCamera: false, // default false
        showTorchButton: true, // default false
        beepOnScan: true, // Play or Suppress beep on scan (default true)
        fullScreen: true, // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
        torchOn: false, // launch with the flashlight on (default false)
        closeCallback: () => {
          console.log("Scanner closed");
        }, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
        presentInRootViewController: true, // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
      })
      .then(
        (result) => {
          // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
          alert({
            title: "Scan result",
            message: "Format: " + result.format + ",\nValue: " + result.text,
            okButtonText: "Ok",
          });

          console.log(".then function fired");
        },
        (errorMessage) => {
          console.log("No scan. " + errorMessage);
        }
      );
  }
</script>

<button
  class="-outline -rounded-lg p-x-10 p-y-10"
  on:tap={scan}><slot /></button>
