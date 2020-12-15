<script lang="ts">
  import { Template } from "svelte-native/components";
  import { navigate } from "svelte-native";
  import { task } from "../../types";
  import AddTask from "./AddTask.svelte";
  import FAB from "../../components/FAB.svelte";
  import { onDestroy, onMount } from "svelte";
  import { myTasksStore } from "../../stores/myTasksStore";
  import Task from "./Task.svelte";

  let tasks: task[];

  $: tasks = $myTasksStore ? $myTasksStore : [];

  export let tabs = false;
</script>

{#if tabs}
  <tabs position="top">
    <tabStrip>
      <tabStripItem><label>Active Tasks</label></tabStripItem>
      <tabStripItem><label>Completed Tasks</label></tabStripItem>
    </tabStrip>

    <tabContentItem>
      <scrollView>
        <stackLayout>
          <button
            class="-rounded-lg -outline m-t-20 m-b-20"
            on:tap={() => {
              tabs = false;
              navigate({ page: AddTask });
            }}>+</button>

          {#each tasks as task}
            <label
              on:tap={() => {
                tabs = false;
                navigate({ page: Task, props: { task } });
              }}
              class="-outline -rounded-lg m-l-15 m-r-15 m-b-20 p-x-15 p-y-10"
              borderColor={task.taskColor ? task.taskColor : '#00e5ff'}
              textWrap={true}>{task.title}</label>
          {/each}
        </stackLayout>
      </scrollView>
    </tabContentItem>
    <tabContentItem><button>hello</button></tabContentItem>
  </tabs>
{/if}
