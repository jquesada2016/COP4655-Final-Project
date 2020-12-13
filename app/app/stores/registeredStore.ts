import {
    getBoolean,
    setBoolean,
} from "@nativescript/core/application-settings";
import { writable } from "svelte/store";

export const registeredStore = writable(getBoolean("registered"));
