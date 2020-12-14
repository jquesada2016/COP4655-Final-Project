<script lang="ts">
  import TabStrip from "./TabStrip.svelte";
  import MyTasks from "./MyTasks.svelte";
  import QRCode from "../../components/QRCode.svelte";
  import ScanQRCode from "../../components/ScanQRCode.svelte";
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
