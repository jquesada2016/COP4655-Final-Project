<script lang="ts">
  import { getString } from "@nativescript/core/application-settings";
  import { navigate, showModal } from "svelte-native";
  import Task from "../Pages/mainContent/Task.svelte";

  import { assignedTasksStore } from "../stores";
  import { task } from "../types";
  import { listFilter as listFilterType } from "../types/types";

  export let urgency: "Low" | "Normal" | "High";
  export let listFilter: listFilterType;

  const myId = getString("id");

  let list: task[] = [];

  setTimeout(() => {
    assignedTasksStore.set([
      {
        id: "kjdf",
        title: "this is a test",
        urgency: "Normal",
        authorId: "",
        assigneeId: myId,
      },
      {
        id: "kjfe",
        title: "this is another test",
        urgency: "High",
        authorId: "",
        assigneeId: myId,
      },
      {
        id: "kjfeq",
        title: "this is yet another test",
        urgency: "Low",
        authorId: "",
        assigneeId: myId,
      },
      {
        id: "kjfeqw",
        title: "this is yet another test",
        urgency: "Normal",
        authorId: "",
        assigneeId: myId,
        taskColor: "red",
      },
    ]);
  }, 0);

  // Figure out how to tell tasks apart

  // Get the list
  $: {
    $assignedTasksStore.map((task) => {
      if (listFilter === "assignedToMe") {
        if (
          myId === task.assigneeId &&
          !task.completed &&
          task.urgency === urgency
        )
          list.push(task);
      } else if (listFilter === "owedTasks") {
        if (
          myId === task.authorId &&
          !task.completed &&
          task.urgency === urgency
        )
          list.push(task);
      } else if (listFilter === "completedByMe") {
        if (
          myId === task.assigneeId &&
          task.completed &&
          task.urgency === urgency
        )
          list.push(task);
      } else if (listFilter === "completedByOthers") {
        if (myId === task.authorId && task.completed && task.urgency === "High")
          list.push(task);
      }

      // Update lists
      list = list;
    });
  }
</script>

<style>
  .hr {
    border-color: #00e5ff;
    width: 75%;
    margin-left: 20;
  }
</style>

{#if list.length}
  <stackLayout class="m-t-30">
    <flexboxLayout>
      <label>{urgency}</label>
      <stackLayout class="hr" flexGrow="1" />
    </flexboxLayout>
    {#each list as item (item.id)}
      <label
        on:tap={() => showModal({
            page: Task,
            props: { task: item },
            fullscreen: true,
          })}
        class="-rounded-lg -outline m-t-20"
        borderColor={item.taskColor}>{item.title}</label>
    {/each}
  </stackLayout>
{/if}
