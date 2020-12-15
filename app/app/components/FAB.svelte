<script lang="ts">
  import { Screen } from "@nativescript/core";

  const top = Screen.mainScreen.heightDIPs - 250;
  const left = Screen.mainScreen.widthDIPs - 80;
</script>

<style>
  flexboxLayout {
    z-index: 100;
  }
</style>

<flexBoxLayout
  {top}
  {left}
  backgroundColor="orangered"
  width="54"
  height="54"
  borderRadius="100%"
  alignItems="center"
  justifyContent="center"
  on:tap>
  <image
    id="fab"
    src="font://&#xf067;"
    class="fas text-center"
    stretch="none" />
</flexBoxLayout>
