<script>
  import { horizontalAlignmentProperty } from "@nativescript/core";
  import { navigate } from "svelte-native";
  import ManagerRegistration from "./Manager.svelte";
  import EmployeeRegistration from "./Employee.svelte";
  import Manager from "./Manager.svelte";
  import Employee from "./Employee.svelte";

  function navigateToManager() {
    navigate({ page: ManagerRegistration });
  }
  function navigateToEmployee() {
    navigate({ page: EmployeeRegistration });
  }
</script>

<stackLayout>
  <label horizontalAlignment="center" class="h1">Register</label>
  <label horizontalAlignment="center" class="m-t-20">Are you an employee or a
    manager?</label>

  <button
    class="-rounded-lg -outline"
    on:tap={navigateToManager}>Manager</button>
  <button
    class="-rounded-lg -outline"
    on:tap={navigateToEmployee}>Employee</button>
</stackLayout>
