// auth-service.ts

import {
    configureTnsOAuth,
    TnsOAuthClient,
    ITnsOAuthTokenResult,
} from "nativescript-oauth2";

import {
    TnsOaProvider,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,
} from "nativescript-oauth2/providers";

import { setString } from "@nativescript/core/application-settings";
import { loginStore } from "./stores";

let client: TnsOAuthClient = null;

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    configureTnsOAuth([googleProvider]);
}

function configureOAuthProviderGoogle() {
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "264611972777-4pn0uvil4qbuqr5t5jidod57b9ksadra.apps.googleusercontent.com",
        redirectUri:
            "com.googleusercontent.apps.264611972777-4pn0uvil4qbuqr5t5jidod57b9ksadra:/auth",
        urlScheme:
            "com.googleusercontent.apps.264611972777-4pn0uvil4qbuqr5t5jidod57b9ksadra",
        scopes: ["email", "profile", "openid"],
    };

    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);

    return googleProvider;
}

export function tnsOauthLogin(providerType) {
    client = new TnsOAuthClient(providerType);

    client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
        if (error) {
            console.error("There was an error logging in.");
            console.error(error);
            return false;
        } else {
            console.log("Logged in successfully.");

            // Save id token to application settings
            setString("idToken", tokenResult.idToken);

            // Set the store to update the UI know we have a idToken
            loginStore.set({ idToken: tokenResult.idToken });
        }
    });
}
