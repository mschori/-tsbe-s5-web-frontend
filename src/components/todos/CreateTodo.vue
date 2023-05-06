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
import axios from "axios";

export default {
    name: "CreateTodo",
    setup(props, {emit}) {
        const todoName = ref('');
        const todoDescription = ref('');
        const todoDueDate = ref('');

        const createTodo = (e) => {
            e.preventDefault();
            axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos`, {
                title: todoName.value,
                description: todoDescription.value,
                due_date: todoDueDate.value
            })
                .then(res => {
                    console.log(res.data);
                    todoName.value = '';
                    todoDescription.value = '';
                    todoDueDate.value = '';
                    emit('get-todos');
                })
                .catch(err => {
                    console.log(err)
                });
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
