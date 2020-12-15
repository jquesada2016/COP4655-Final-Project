<script lang="ts">
  import ActionBar from "~/components/ActionBar.svelte";
  import { URL, FETCH_OPTIONS } from "../../constants";
  import { task as taskType } from "../../types";
  import { confirm } from "@nativescript/core/ui/dialogs";
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";
  import { completedMyTasksStore, myTasksStore } from "../../stores";
  import { goBack } from "svelte-native";

  export let task: taskType;

  console.log(task);

  const deleteQuery = `
  mutation{
  deleteTask(id:"${task.id}")
}
  `;

  async function deleteOrCompleteTask(deleteTask: boolean) {
    const ok = await confirm(
      "Are you sure you want to permanently delete this task?"
    );

    if (!ok) return;

    let res: any;

    try {
      res = await fetch(URL, {
        ...FETCH_OPTIONS,
        body: JSON.stringify({ query: deleteQuery }),
      });
    } catch (e) {
      console.log(e);
    }

    const data = await res.json();

    console.log(data);

    if (data.data.deleteTask) {
      const myTasksString = getString("myTasks");
      let myTasks: taskType[] = myTasksString ? JSON.parse(myTasksString) : [];

      let completedMyTasks: taskType[];
      if (!deleteTask) {
        const completedMyTasksString = getString("completedMyTasks");
        completedMyTasks = completedMyTasksString
          ? JSON.parse(completedMyTasksString)
          : [];
      }

      // Find the task and move from active to completed list
      const taskIndex = myTasks.findIndex((item) => item.id === task.id);
      if (!deleteTask) completedMyTasks.push(myTasks.splice(taskIndex, 1)[0]);
      else myTasks.splice(taskIndex, 1);

      // Save the two lists
      setString("myTasks", JSON.stringify(myTasks));
      if (!deleteTask)
        setString("completedMyTasks", JSON.stringify(completedMyTasks));

      // Let the UI know there was a change
      myTasksStore.set(myTasks);
      if (!deleteTask) completedMyTasksStore.set(completedMyTasks);

      // Close the task modal
      goBack();
    } else {
      alert("an error has occurred");
    }
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
          on:tap={() => deleteOrCompleteTask(true)}
          class="fas"
          src="font://&#xf2ed;"
          stretch="aspectFit" />
        <image
          on:tap={() => deleteOrCompleteTask(false)}
          class="fas"
          src="font://&#xf058;"
          stretch="aspectFit" />
      </flexboxLayout>
      <button class="-outline -rounded-lg m-t-10 m-r-10 m-r-10">Cancel</button>
    </stackLayout>
  </flexboxLayout>
</page>
