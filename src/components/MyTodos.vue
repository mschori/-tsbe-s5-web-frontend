<template>
  <div>
      hallo
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';

export default {
  name: "MyTodos",

  setup() {
    const todos = ref([])

    const getTodo = () => {
      axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos`)
          .then(res => {
            todos.value = res.data
            console.log(todos.value);
          })
          .catch(err => {
            console.log(err)
          });
    }

    const addTodo = () => {

    }

    const toggleTodo = () => {

    }

    const removeTodo = () => {

    }

    onMounted(() => {
      console.log('mounted')
      getTodo()
    })

    return {
      todos,
      addTodo,
      toggleTodo,
      removeTodo
    }
  },
}
</script>

<style scoped>

</style>
