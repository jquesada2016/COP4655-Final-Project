<script lang="ts">
  import TabStrip from "./TabStrip.svelte";
  import MyTasks from "./MyTasks.svelte";
  import Logout from "../../components/Logout.svelte";
</script>

<page>
  <actionBar title="Queara Tasks" />

  <bottomNavigation>
    <TabStrip />
    <tabContentItem>
      <MyTasks />
    </tabContentItem>
    <tabContentItem>
      <gridLayout>
        <label class="h2 text-center">Assigned Tasks</label>
      </gridLayout>
    </tabContentItem>
    <tabContentItem>
      <Logout />
    </tabContentItem>
  </bottomNavigation>
</page>
