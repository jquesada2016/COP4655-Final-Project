import { getString } from "@nativescript/core/application-settings";
import { writable } from "svelte/store";
import { task } from "../types";

const assignedTasksString = getString("assignedTasks");

export const assignedTasksStore = writable<task[]>(
    assignedTasksString ? JSON.parse(assignedTasksString) : []
);
