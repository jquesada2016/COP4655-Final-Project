<script lang="ts">
  import { navigate } from "svelte-native";
  import { task } from "../../types";
  import AddTask from "./AddTask.svelte";
  import { myTasksStore } from "../../stores/myTasksStore";
  import Task from "./Task.svelte";

  let tasks: task[];
  let completedTasks: task[];

  let high: task[];
  let normal: task[];
  let low: task[];

  $: {
    tasks = $myTasksStore.filter((item) => !item.completed);

    console.log(tasks);
    completedTasks = $myTasksStore.filter((item) => item.completed);

    high = tasks.filter((item) => item.urgency === "High");
    normal = tasks.filter((item) => item.urgency === "Normal");
    low = tasks.filter((item) => item.urgency === "Low");
  }

  function filterActive(task: task) {
    return !task.completed;
  }
  function filterComplete(task: task) {
    return task.completed;
  }

  // $: tasks = $myTasksStore ? $myTasksStore.filter((item) => !item.completed) : [];
  // $: completedTasks =  ? $myTasksStore.filter((item) => item.completed) : [];
  tasks = [];
  completedTasks = [];

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

          {#if high.length}
            <flexboxLayout alignItems="center">
              <label class="m-20">High</label>

              <stackLayout
                flexGrow="1"
                class="hr"
                marginRight="20"
                borderColor="#FFF"
                width="50%" />
            </flexboxLayout>
            {#each high as task (task.id)}
              {#if task}
                <label
                  on:tap={() => {
                    tabs = false;
                    navigate({ page: Task, props: { task } });
                  }}
                  class="-outline -rounded-lg m-l-15 m-r-15 m-b-20 p-x-15 p-y-10"
                  borderColor={task.taskColor ? task.taskColor : '#00e5ff'}
                  textWrap={true}>{task.title}</label>
              {/if}
            {/each}
          {/if}
          {#if normal.length}
            <flexboxLayout alignItems="center">
              <label class="m-20">Normal</label>

              <stackLayout
                flexGrow="1"
                class="hr"
                marginRight="20"
                borderColor="#FFF"
                width="50%" />
            </flexboxLayout>
            {#each normal as task (task.id)}
              {#if task}
                <label
                  on:tap={() => {
                    tabs = false;
                    navigate({ page: Task, props: { task } });
                  }}
                  class="-outline -rounded-lg m-l-15 m-r-15 m-b-20 p-x-15 p-y-10"
                  borderColor={task.taskColor ? task.taskColor : '#00e5ff'}
                  textWrap={true}>{task.title}</label>
              {/if}
            {/each}
          {/if}
          {#if low.length}
            <flexboxLayout alignItems="center">
              <label class="m-20">Low</label>

              <stackLayout
                flexGrow="1"
                class="hr"
                marginRight="20"
                borderColor="#FFF"
                width="50%" />
            </flexboxLayout>
            {#each low as task (task.id)}
              {#if task}
                <label
                  on:tap={() => {
                    tabs = false;
                    navigate({ page: Task, props: { task } });
                  }}
                  class="-outline -rounded-lg m-l-15 m-r-15 m-b-20 p-x-15 p-y-10"
                  borderColor={task.taskColor ? task.taskColor : '#00e5ff'}
                  textWrap={true}>{task.title}</label>
              {/if}
            {/each}
          {/if}
        </stackLayout>
      </scrollView>
    </tabContentItem>
    <tabContentItem>
      <scrollView class="m-t-20">
        <stackLayout>
          {#each completedTasks as task (task.id)}
            {#if task}
              <label
                on:tap={() => {
                  tabs = false;
                  navigate({ page: Task, props: { task, type: 'completed' } });
                }}
                class="-outline -rounded-lg m-l-15 m-r-15 m-b-20 p-x-15 p-y-10"
                borderColor={task.taskColor ? task.taskColor : '#00e5ff'}
                textWrap={true}>{task.title}</label>
            {/if}
          {/each}
        </stackLayout>
      </scrollView>
    </tabContentItem>
  </tabs>
{/if}
