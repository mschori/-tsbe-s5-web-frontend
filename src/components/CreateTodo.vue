<template>
    <div class="my-5">
        <form v-on:submit="createTodo">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input :value="todoName" @input="e => todoName = e.target.value" class="form-control"
                       placeholder="Name your todo" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Description</label>
                <input :value="todoDescription" @input="e => todoDescription = e.target.value" class="form-control"
                       placeholder="Name your todo" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Due-Date</label>
                <input :value="todoDueDate" @input="e => todoDueDate = e.target.value" class="form-control" type="date"
                       placeholder="Name your todo" required>
            </div>
            <button class="btn btn-primary">
                Create Todo
            </button>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: "CreateTodo",
    setup() {
        const todoName = ref('');
        const todoDescription = ref('');
        const todoDueDate = ref('');

        const createTodo = (e) => {
            e.preventDefault();
            console.log('submitted')
            // Call getTodo() from MyTodos.vue
            this.$emit('getTodos');


        }

        return {
            todoName,
            todoDescription,
            todoDueDate,
            createTodo
        }
    }
}
</script>

<style scoped>

</style>
