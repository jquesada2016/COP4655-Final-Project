<script>
  import { ImageSource } from "@nativescript/core";
  import { getString } from "@nativescript/core/application-settings";
  import { QrGenerator } from "nativescript-qr-generator";

  const src = new ImageSource(new QrGenerator().generate(getString("id")));
</script>

<image {src} width="200" height="200" class="m-t-20 m-b-20" />
