<script lang="ts">
  import { goBack } from "svelte-native";
  import { closeModal } from "svelte-native";

  import { colors } from "../../colors";
  export let colorSelectionCallback: (color: string) => string;

  const colorKeys = Object.keys(colors);

  const colorShade = "300";
</script>

<page class="p-t-20 p-b-20 p-l-20 p-r-20" borderRadius="25%">
  <stackLayout>
    <label class="h2" horizontalAlignment="center">Please select a color</label>
    <scrollView>
      <flexboxLayout flexWrap="wrap" justifyContent="flex-start ">
        {#each colorKeys as colorKey}
          <stackLayout
            on:tap={() => {
              closeModal();
              colorSelectionCallback(colors[colorKey][colorShade]);
            }}
            backgroundColor={colors[colorKey][colorShade]}
            width="40"
            height="40"
            borderRadius="100%"
            marginLeft="10"
            marginRight="10"
            marginTop="10"
            marginBottom="10" />
        {/each}
        <button
          class="-rounded-lg -outline m-t-10"
          width="100%"
          on:tap={closeModal}>Cancel</button>
      </flexboxLayout>
    </scrollView>
  </stackLayout>
</page>
