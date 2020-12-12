<script lang="ts">
  import { Template } from "svelte-native/components";
  import { showModal } from "svelte-native";
  import FAB from "../../components/FAB.svelte";
  import AddTask from "./AddTask.svelte";
  import { onMount, onDestroy } from "svelte";
  import { task } from "../../types";

  let items: task[] = [];

  onMount(async () => {
    const res = await fetch("http://10.0.2.2:7000/tasks").catch((err) =>
      console.log(err)
    );
    const data = await res.json();
    items = [...items, ...(data.tasks as task[])];
  });
</script>

<absoluteLayout>
  <stackLayout height="100%" width="100%">
    <!-- <button on:tap={fetchData}>fetch data...</button> -->
    <listView {items}>
      <Template let:item><label class="h2">{item.title}</label></Template>
    </listView>
  </stackLayout>
  <FAB on:tap={() => showModal({ page: AddTask })} />
</absoluteLayout>
