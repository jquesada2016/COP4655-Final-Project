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

  let tabs = true;
</script>

<page on:navigatingTo={() => (tabs = true)}>
  <actionBar title="Queara Tasks" />

  <bottomNavigation>
    <TabStrip />
    <tabContentItem>
      <MyTasks bind:tabs />
    </tabContentItem>
    <tabContentItem>
      <gridLayout>
        <label class="h2 text-center">Assigned Tasks</label>
      </gridLayout>
    </tabContentItem>
    <tabContentItem>
      <scrollView>
        <stackLayout>
          <label text="Profile" class="h2 text-center" />
          <QRCode />
          <ScanQRCode manager>Scan Manager QR Code</ScanQRCode>
          <ScanQRCode>Scan Employee QR Code</ScanQRCode>

          <Logout />
          <Unregister />
        </stackLayout>
      </scrollView>
    </tabContentItem>
  </bottomNavigation>
</page>
