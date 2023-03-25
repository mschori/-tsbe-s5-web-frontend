<template>
  <div>
    <h1>Todo View</h1>
    <MyTodos/>
  </div>
</template>

<script>
import MyTodos from "@/components/MyTodos.vue";

export default {
  name: "TodoView",
  components: {MyTodos}
}
</script>

<style scoped>

</style>
