<script lang="ts">
  import TabStrip from "./TabStrip.svelte";
  import MyTasks from "./MyTasks.svelte";
  import Logout from "../../components/Logout.svelte";
  import Unregister from "../../components/Unregister.svelte";
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
      <flexboxLayout flexDirection="column">
        <label text="Profile" class="h2 text-center m-b-20" flexGrow="1" />
        <stackLayout verticalAlignment="center" class="m-b-20">
          <Logout />
          <Unregister />
        </stackLayout>
      </flexboxLayout>
    </tabContentItem>
  </bottomNavigation>
</page>
