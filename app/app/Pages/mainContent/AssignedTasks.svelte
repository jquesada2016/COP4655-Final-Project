<script lang="ts">
  import TaskList from "../../components/TaskList.svelte";

  export let tabs = true;
</script>

{#if tabs}
  <tabs position="top">
    <tabStrip>
      <tabStripItem><label>Assigned to Me</label></tabStripItem>
      <tabStripItem><label>Tasks Owed</label></tabStripItem>
      <tabStripItem><label>Completed by Me</label></tabStripItem>
      <tabStripItem><label>Completed by Others</label></tabStripItem>
    </tabStrip>

    <tabContentItem>
      <scrollView>
        <stackLayout class="m-x-20">
          <TaskList urgency="High" listFilter="assignedToMe" />
          <TaskList urgency="Normal" listFilter="assignedToMe" />
          <TaskList urgency="Low" listFilter="assignedToMe" />
        </stackLayout>
      </scrollView>
    </tabContentItem>
    <tabContentItem>
      <label class="m-30">There's nothing to show here</label>
    </tabContentItem>
    <tabContentItem>
      <label class="m-30">There's nothing to show here</label>
    </tabContentItem>
    <tabContentItem>
      <label class="m-30">There's nothing to show here</label>
    </tabContentItem>
  </tabs>
{/if}
