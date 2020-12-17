<script lang="ts">
  import { tnsOauthLogin } from "../auth-service";
  import { colors } from "../colors";

  function loginGoogle() {
    tnsOauthLogin("google");
  }
</script>

<button
  color="white"
  on:tap={loginGoogle}
  backgroundColor={colors.green['300']}
  class="-primary -rounded-lg"
  wrapText="none">Login with Google</button>
