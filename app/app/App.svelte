<script lang="ts">
  import TabStrip from "./components/TabStrip.svelte";
  import MyTasks from "./components/MyTasks.svelte";
</script>

<page>
  <actionBar title="Queara Tasks" />

  <bottomNavigation>
    <TabStrip />

    <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
    <tabContentItem>
      <MyTasks />
    </tabContentItem>
    <tabContentItem>
      <gridLayout>
        <label text="Account Page" class="h2 text-center" />
      </gridLayout>
    </tabContentItem>
    <tabContentItem>
      <gridLayout>
        <label text="Search Page" class="h2 text-center" />
      </gridLayout>
    </tabContentItem>
  </bottomNavigation>
</page>
