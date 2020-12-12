import { writable } from "svelte/store";
import { getString } from "@nativescript/core/application-settings";

// Get the idToken stored in app settings storage, and assign it to a reactive Svelte store
export const loginStore = writable({ idToken: getString("idToken") });
