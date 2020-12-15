import { getString } from "@nativescript/core/application-settings";
import { writable } from "svelte/store";
import { task } from "../types";

let myTasksArr: task[] = [];
try {
    myTasksArr = JSON.parse(getString("myTasks")) as task[];
} catch (e) {
    console.log(e);
}

export const myTasksStore = writable(myTasksArr);
