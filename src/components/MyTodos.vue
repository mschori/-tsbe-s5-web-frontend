<template>
    <CreateTodo @getTodos="getTodo()"/>
    <div class="container">
        <div class="row" v-for="(todo, idx) in todos" v-bind:key="idx">
            <div class="form-check m-2">
                <input class="form-check-input" type="checkbox"
                       :id="'checkbox-' + todo.id"
                       v-if="!todo.is_completed"
                       v-on:change="toggleTodo(todo.id)">
                <input class="form-check-input" type="checkbox"
                       :id="'checkbox-' + todo.id"
                       v-else checked
                       v-on:change="toggleTodo(todo.id)">
                <label class="form-check-label" :for="'checkbox-' + todo.id">
                    {{ todo.title }}
                </label>
                <button class="btn btn-danger btn-sm float-end"
                        v-on:click="removeTodo(todo.id)">
                    Delete
                </button>
            </div>
            <hr/>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import CreateTodo from "@/components/CreateTodo.vue";

export default {
    name: "MyTodos",
    components: {CreateTodo},

    setup() {
        const todos = ref([]);

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

        const toggleTodo = (id) => {
            const isChecked = document.getElementById('checkbox-' + id).checked;
            axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos/${id}`, {
                is_completed: isChecked
            })
                .then(res => {
                    console.log(res.data);
                    getTodo();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        const removeTodo = (id) => {
            axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/todos/${id}`)
                .then(res => {
                    console.log(res.data);
                    getTodo();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        onMounted(() => {
            console.log('mounted')
            getTodo()
        })

        return {
            todos,
            getTodo,
            addTodo,
            toggleTodo,
            removeTodo
        }
    },
}
</script>

<style scoped>

</style>
