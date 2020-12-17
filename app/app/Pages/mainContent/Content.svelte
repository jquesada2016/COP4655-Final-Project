<script lang="ts">
  import TabStrip from "./TabStrip.svelte";
  import MyTasks from "./MyTasks.svelte";
  import QRCode from "../../components/QRCode.svelte";
  import ScanQRCode from "../../components/ScanQRCode.svelte";
  import Logout from "../../components/Logout.svelte";
  import Unregister from "../../components/Unregister.svelte";
  import FAB from "../../components/FAB.svelte";
  import AddTask from "./AddTask.svelte";
  import { navigate } from "svelte-native";
  import ActionBar from "../../components/ActionBar.svelte";
  import AssignedTasks from "./AssignedTasks.svelte";

  let tabs = true;
</script>

<page on:navigatingTo={() => (tabs = true)}>
  <ActionBar />

  <bottomNavigation>
    <TabStrip />
    <tabContentItem>
      <MyTasks bind:tabs />
    </tabContentItem>
    <tabContentItem>
      <gridLayout>
        <AssignedTasks bind:tabs />
      </gridLayout>
    </tabContentItem>
    <tabContentItem>
      <scrollView>
        <stackLayout>
          <label text="Profile" class="h2 text-center" />
          <QRCode />
          <ScanQRCode manager>Scan QR Code</ScanQRCode>

          <Logout />
          <Unregister />
        </stackLayout>
      </scrollView>
    </tabContentItem>
  </bottomNavigation>
</page>
