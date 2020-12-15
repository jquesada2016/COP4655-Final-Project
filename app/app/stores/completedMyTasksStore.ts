import { getString } from "@nativescript/core/application-settings";
import { writable } from "svelte/store";
import { task } from "../types";

let completedMyTasksArr: task[] = [];
try {
    completedMyTasksArr = JSON.parse(getString("completedMyTasks")) as task[];
} catch (e) {
    console.log(e);
}

export const completedMyTasksStore = writable(completedMyTasksArr);
