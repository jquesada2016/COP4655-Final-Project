import { getString } from "@nativescript/core/application-settings";
import { writable } from "svelte/store";
import { assignableUser } from "../types/types";

const assignableUsersString: string = getString("assignableUsers");

export const assignableUsersStore = writable<assignableUser[]>(
    assignableUsersString ? JSON.parse(assignableUsersString) : []
);
