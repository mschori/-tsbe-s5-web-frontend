<template>
    <div>
        <h1>Todo View</h1>
        <MyTodos/>
    </div>
</template>

<script>
import MyTodos from "@/components/todos/MyTodos.vue";
import CreateTodo from "@/components/todos/CreateTodo.vue";

export default {
    name: "TodoView",
    components: {MyTodos}
}
</script>

<style scoped>

</style>
