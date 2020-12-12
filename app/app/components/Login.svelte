<script lang="ts">
  import { getString } from "@nativescript/core/application-settings";
  import { loginStore } from "../stores";
  import { tnsOauthLogin } from "../auth-service";

  async function loginGoogle() {
    tnsOauthLogin("google");
  }
</script>

<button
  on:tap={loginGoogle}
  backgroundColor="#999"
  class="h4"
  wrapText="none">Login with Google</button>
