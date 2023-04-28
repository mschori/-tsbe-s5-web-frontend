<template>
    <div>
        <h1>Todo View</h1>
        <MyTodos/>
    </div>
</template>

<script>
import MyTodos from "@/components/MyTodos.vue";
import CreateTodo from "@/components/CreateTodo.vue";

export default {
    name: "TodoView",
    components: {CreateTodo, MyTodos}
}
</script>

<style scoped>

</style>
