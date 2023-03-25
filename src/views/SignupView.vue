<template>
  <div>
    <h1>Signup now for this awesome APP</h1>

    <div class="mt-5">
      <form @submit="submit">
        <div class="row mb-3">
          <div class="col-12 col-lg-6">
            <label for="inputFirstname" class="form-label">Firstname</label>
            <input type="text" class="form-control" id="inputFirstname" v-model="firstname" required>
          </div>
          <div class="col-12 col-lg-6">
            <label for="inputLastname" class="form-label">Lastname</label>
            <input type="text" class="form-control" id="inputLastname" v-model="lastname" required>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label for="inputEmail" class="form-label">Email</label>
            <input v-if="emailError" type="email" class="form-control is-invalid" id="inputEmail" v-model="email"
                   required>
            <input v-else type="email" class="form-control" id="inputEmail" v-model="email" required>
            <div v-if="emailError" id="emailHelp" class="form-text text-danger">
              {{ emailErrorText }}
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12 col-lg-6">
            <label for="inputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model="password" required>
          </div>
          <div class="col-12 col-lg-6">
            <label for="inputPassword2" class="form-label">Confirm Password</label>
            <input v-if="password2Error" type="password" class="form-control is-invalid" id="inputPassword2"
                   v-model="password2" required>
            <input v-else type="password" class="form-control" id="inputPassword2" v-model="password2" required>
            <div v-if="password2Error" id="password2Help" class="form-text text-danger">
              Password and password-confirm are not the same.
            </div>
          </div>
        </div>
        <button class="btn btn-primary mt-2" type="submit">
          Signup
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from "axios";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

export default {
  name: "RegisterView",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const firstname = ref('Michael');
    const lastname = ref('Schori');
    const email = ref('test42@test.ch');
    const password = ref('Sml12345');
    const password2 = ref('Sml12345');
    const emailError = ref(false);
    const emailErrorText = ref('This is an error message.');
    const password2Error = ref(false);

    const submit = (e) => {
      e.preventDefault();
      if (password.value !== password2.value) {
        password2Error.value = true;
        return;
      } else {
        password2Error.value = false;
      }
      axios.post('http://localhost:8000/api/signup', {
        firstname: firstname.value,
        lastname: lastname.value,
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
          .catch(function (error) {
                if (error.response.data.email) {
                  emailError.value = true;
                  if (error.response.data.email[0] === 'This field must be unique.') {
                    emailErrorText.value = 'This email is already registered.';
                  } else {
                    emailErrorText.value = error.response.data.email[0];
                  }
                }
              }
          );
    }

    return {
      firstname,
      lastname,
      email,
      password,
      password2,
      emailError,
      emailErrorText,
      password2Error,
      submit
    }
  }
}
</script>

<style scoped>

</style>
