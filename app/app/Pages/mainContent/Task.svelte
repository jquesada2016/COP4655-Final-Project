<script lang="ts">
  import ActionBar from "~/components/ActionBar.svelte";
  import { URL, FETCH_OPTIONS } from "../../constants";
  import { task as taskType } from "../../types";
  import { confirm } from "@nativescript/core/ui/dialogs";
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";
  import { myTasksStore } from "../../stores";

  import { goBack } from "svelte-native";

  export let task: taskType;

  const deleteQuery = `
mutation{
  deleteTask(id:"${task.id}")
}
  `;

  async function deleteTask() {
    const ok = await confirm(
      "Are you sure you want to permanently delete this task?"
    );

    if (!ok) return;

    // Delete on DB
    const res = fetch(URL, {
      ...FETCH_OPTIONS,
      body: JSON.stringify({ query: deleteQuery }),
    });

    // Get the list of tasks
    const myTasksString = getString("myTasks");
    const myTasks: taskType[] = JSON.parse(myTasksString);

    // Find this tasks' index
    const taskIndex = myTasks.findIndex((item) => item.id === task.id);

    // Delete the item and update storage and UI
    myTasks.splice(taskIndex, 1);
    setString("myTasks", JSON.stringify(myTasks));
    myTasksStore.set(myTasks);
    goBack();
  }

  async function toggleCompletedTask() {
    // Get tasks
    const myTasksString = getString("myTasks");
    const myTasks: taskType[] = JSON.parse(myTasksString);

    // Get this tasks' index
    const taskIndex = myTasks.findIndex((item) => item.id === task.id);

    // Toggle the completed state
    myTasks[taskIndex].completed = !myTasks[taskIndex].completed;

    // Save the list and update the UI
    setString("myTasks", JSON.stringify(myTasks));
    myTasksStore.set(myTasks);
    goBack();
  }
</script>

<style>
  button {
    padding: 10;
  }

  image {
    border-width: 1;
    border-color: white;
    border-radius: 25%;
    height: 35;
    width: 100%;
    margin-left: 10;
    margin-right: 10;
    padding-top: 10;
    padding-bottom: 10;
  }
</style>

<page>
  <ActionBar back />

  <flexboxLayout flexDirection="column">
    <scrollView flexGrow="1">
      <stackLayout padding="20">
        <label class="h1" horizontalAlignment="center">Task</label>

        <label class="m-t-20">
          <formattedString>
            <span fontWeight="bold">Title:</span>
          </formattedString>
        </label>
        <label class="h3" textWrap={true}>{task.title}</label>

        {#if task.description}
          <label class="m-t-20">
            <formattedString>
              <span fontWeight="bold">Description:</span>
            </formattedString>
          </label>
          <label class="h3" textWrap={true}>{task.description}</label>
        {/if}
      </stackLayout>
    </scrollView>
    <stackLayout class="m-b-20">
      <flexboxLayout justifyContent="space-between" class="m-t-20 m-l-5">
        <image
          on:tap={deleteTask}
          class="fas"
          src="font://&#xf2ed;"
          stretch="aspectFit" />
        <image
          on:tap={toggleCompletedTask}
          class="fas"
          src="font://&#xf058;"
          stretch="aspectFit" />
      </flexboxLayout>
      <button class="-outline -rounded-lg m-t-10 m-r-10 m-r-10">Cancel</button>
    </stackLayout>
  </flexboxLayout>
</page>
