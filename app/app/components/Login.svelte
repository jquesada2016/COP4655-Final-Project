<script lang="ts">
  import { tnsOauthLogin } from "../auth-service";

  function loginGoogle() {
    tnsOauthLogin("google");
  }
</script>

<button
  on:tap={loginGoogle}
  backgroundColor="#999"
  class="h4"
  wrapText="none">Login with Google</button>
