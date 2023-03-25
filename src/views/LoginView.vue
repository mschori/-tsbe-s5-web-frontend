<template>
  <div>
    <h1>Login my fried</h1>

    <div class="mt-5">
      <form @submit="submit">
        <div class="row mb-3">
          <div class="col">
            <label for="inputEmail" class="form-label">Email</label>
            <input v-if="isError" type="email" class="form-control is-invalid" id="inputEmail" v-model="email"
                   required>
            <input v-else type="email" class="form-control" id="inputEmail" v-model="email" required>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="inputPassword" class="form-label">Password</label>
            <input v-if="isError" type="password" class="form-control is-invalid" id="inputPassword" v-model="password"
                   required>
            <input v-else type="password" class="form-control" id="inputPassword" v-model="password" required>
          </div>
        </div>
        <button class="btn btn-primary mt-2" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>

  <div v-if="isError" class="alert alert-danger mt-3" role="alert">
    Login failed! Have you used the correct email and password?
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import axios from "axios";

export default {
  name: "LoginView",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const isError = ref(false);

    onMounted(() => {
      if (userStore.isLoggedIn) {
        router.push('/')
      }
    })

    const submit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/api/signin', {
        email: email.value,
        password: password.value
      })
          .then(function (response) {
            userStore.setUser({
              firstname: response.data.user.firstname,
              lastname: response.data.user.lastname,
              email: response.data.user.email,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              isLoggedIn: true
            });
            router.push('/')
          })
          .catch(function () {
            isError.value = true;
          })
    }

    return {
      email,
      password,
      isError,
      submit
    }
  }
}
</script>

<style scoped>

</style>
