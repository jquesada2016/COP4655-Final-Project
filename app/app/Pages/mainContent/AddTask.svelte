<script lang="ts">
  import { LocalNotifications } from "nativescript-local-notifications";
  import { goBack, showModal } from "svelte-native";
  import ColorPicker from "./ColorPicker.svelte";

  import ActionBar from "../../components/ActionBar.svelte";
  import { assign } from "svelte/internal";
  import {
    getString,
    setString,
  } from "@nativescript/core/application-settings";
  import { URL } from "../../constants";
  import { task } from "../../types";
  import { myTasksStore } from "../../stores/myTasksStore";

  let title: string;
  let description: string;

  let reminder = false;
  let assignTask = false;

  let urgencyItems = ["Low", "Normal", "High"];
  let urgencySelectedIndex = 1;

  let assignablePeople = ["Joe", "John"];
  let assignablePeopleIndex = 0;

  let selectedDate: Date;
  let selectedHour: number;
  let selectedMinute: number;

  let adjustedDate: Date = new Date();

  selectedHour = adjustedDate.getHours();
  selectedMinute = adjustedDate.getMinutes();

  const iconSize = 32;

  let taskColor: string;

  let query: string;

  $: {
    adjustedDate.setHours(selectedHour, selectedMinute);

    query = `
  mutation {
  addNewTask(
    task: {
      authorId: "${getString("id")}"
      ${title ? `title: "${title}"` : ""}
      ${description ? `description: "${description}"` : ""}
      ${reminder ? `reminder: ${adjustedDate.getTime()}` : ""}
      urgency: "${urgencyItems[urgencySelectedIndex]}"
      ${taskColor ? `taskColor: "${taskColor}"` : ""}
    }
  ) {
    id
  }
}

  `;
    console.log(query);
  }

  async function saveTask() {
    const queryString = JSON.stringify({ query });
    const headers = { "content-type": "application/json" };

    if (!title) {
      alert("Title is required!");
      return;
    }

    let data: any;

    try {
      const res = await fetch(URL, {
        method: "post",
        headers,
        body: queryString,
      });

      data = await res.json();

      console.log(data);
    } catch (e) {
      console.log(e);

      alert("Connection error");
      return;
    }

    // Perform sanity checks
    if (reminder && adjustedDate.getTime() < Date.now()) {
      alert("Reminder must be set in the future");
      return;
    }

    // Get tasks list
    const myTasksString = getString("myTasks");
    const myTasksArr: task[] = myTasksString ? JSON.parse(myTasksString) : [];

    myTasksArr.push({
      id: data.data.addNewTask.id,
      title,
      description,
      urgency: urgencyItems[urgencySelectedIndex],
      reminder: reminder ? adjustedDate.getTime() : null,
      taskColor,
    });

    // Save tasks list
    setString("myTasks", JSON.stringify(myTasksArr));
    myTasksStore.set(myTasksArr);

    LocalNotifications.schedule([
      {
        title,
        body: description,
        color: taskColor,
        at: adjustedDate,
        notificationLed: true,
      },
    ]);

    goBack();
  }
</script>

<style>
  .icon {
    border-width: 1;
    border-color: #00e5ff;
    border-radius: 25%;
    height: 35;
    width: 100%;
    padding: 10;
    margin-left: 5;
    margin-right: 5;
  }

  .picker {
    color: black;
    background-color: white;
    border-radius: 25%;
    margin-bottom: 20;
  }

  button {
    padding: 10;
  }
</style>

<page>
  <ActionBar back />

  <scrollView>
    <stackLayout>
      <label class="h1">{taskColor}</label>
      <label horizontalAlignment="center" class="h1">Add New Task</label>

      <stackLayout class="nt-form">
        <stackLayout class="nt-input">
          <label>Title:</label>
          <textField autocorrect={true} hint="Task title *" bind:text={title} />
        </stackLayout>

        <stackLayout class="nt-input">
          <label>Description:</label>
          <textField
            autocorrect={true}
            hint="Task description"
            bind:text={description} />
        </stackLayout>

        <button
          class="-outline -rounded-lg m-t-20"
          borderColor={taskColor ? taskColor : '#00e5ff'}
          on:tap={() => showModal({
              page: ColorPicker,
              props: { colorSelectionCallback: (color) => (taskColor = color) },
              // fullscreen: true,
            })}>Select Task Color</button>

        <stackLayout class="nt-input">
          <flexboxLayout alignItems="center">
            <label flexGrow={1}>Would you like a reminder?</label>
            <switch bind:checked={reminder} />
          </flexboxLayout>
          {#if reminder}
            <stackLayout class="picker">
              <datePicker
                bind:date={selectedDate}
                minDate={new Date()}
                class="m-b-20" />
              <timePicker
                bind:hour={selectedHour}
                bind:minute={selectedMinute} />
            </stackLayout>
          {/if}
        </stackLayout>

        <stackLayout class="nt-input">
          <flexboxLayout alignItems="center">
            <label flexGrow={1}>Assign Task</label>
            <switch bind:checked={assignTask} />
          </flexboxLayout>
          {#if assignTask}
            <listPicker
              bind:items={assignablePeople}
              bind:selectedIndex={assignablePeopleIndex}
              class="picker" />
          {/if}
        </stackLayout>

        <stackLayout class="nt-input">
          <label>Urgency:</label>
          <listPicker
            items={urgencyItems}
            class="picker"
            bind:selectedIndex={urgencySelectedIndex} />
        </stackLayout>

        <stackLayout class="nt-input">
          <label>Add media:</label>

          <flexboxLayout justifyContent="space-between">
            <stackLayout class="icon">
              <image src="font://&#xf03e;" stretch="aspectFit" class="fas" />
            </stackLayout>
            <stackLayout class="icon">
              <image src="font://&#xf130;" stretch="aspectFit" class="fas" />
            </stackLayout>
            <stackLayout class="icon">
              <image src="font://&#xf03d;" stretch="aspectFit" class="fas" />
            </stackLayout>
            <stackLayout class="icon">
              <image src="font://&#xf3c5;" stretch="aspectFit" class="fas" />
            </stackLayout>
          </flexboxLayout>
        </stackLayout>
      </stackLayout>
      <button class="-rounded-lg -outline m-t-20" on:tap={saveTask}>Add Task</button>
      <button
        class="-rounded-lg -outline m-t-20 m-b-20"
        on:tap={goBack}
        borderColor="#f44336">Cancel</button>
    </stackLayout>
  </scrollView>
</page>
