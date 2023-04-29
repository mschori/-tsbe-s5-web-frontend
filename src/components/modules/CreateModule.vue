<template>
    <div class="my-5">
        <form v-on:submit="createModule">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input :value="moduleName" @input="e => moduleName = e.target.value" class="form-control"
                       placeholder="Name your module" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Description</label>
                <input :value="moduleDescription" @input="e => moduleDescription = e.target.value" class="form-control"
                       placeholder="Describe your module" required>
            </div>
            <button class="btn btn-primary">
                Create module
            </button>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
    name: "CreateModule",
    setup(props, {emit}) {
        const moduleName = ref('');
        const moduleDescription = ref('');

        const createModule = (e) => {
            e.preventDefault();
            axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/modules`, {
                name: moduleName.value,
                description: moduleDescription.value,
            })
                .then(() => {
                    moduleName.value = '';
                    moduleDescription.value = '';
                    emit('get-modules');
                })
                .catch(err => {
                    console.log(err)
                });
        }

        return {
            moduleName,
            moduleDescription,
            createModule
        };
    },
}
</script>

<style scoped>

</style>
