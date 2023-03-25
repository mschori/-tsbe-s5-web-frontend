<template>
  <div>

  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";

export default {
  name: "LoginView",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    onMounted(() => {
      if (userStore.isLoggedIn) {
        router.push('/')
      }
    })

    return {
      userStore,
      router
    }
  }
}
</script>

<style scoped>

</style>
