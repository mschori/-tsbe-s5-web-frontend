<template>
    <div class="my-5">
        <form v-on:submit="createGrade">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Module</label>
                <select class="form-select" aria-label="Default select example" v-model="selectedModule" required>
                    <option v-for="module in modules" :key="module.id" :value="module.id">{{ module.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Grade Title</label>
                <input :value="gradeTitle" @input="e => gradeTitle = e.target.value" class="form-control"
                       placeholder="Name your module" required>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Grade</label>
                <input :value="grade" @input="e => grade = e.target.value" class="form-control" type="number"
                       step="0.1" required min="1" max="6">
            </div>
            <button class="btn btn-primary">
                Create grade
            </button>
        </form>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';

export default {
    name: 'CreateGrade',
    setup(props, {emit}) {
        const modules = ref([]);
        const selectedModule = ref('');
        const gradeTitle = ref('');
        const grade = ref(4.5);

        onMounted(() => {
            getModules();
        });

        const getModules = () => {
            axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/modules`)
                .then(res => {
                    modules.value = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const createGrade = (e) => {
            e.preventDefault();
            axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/grades`, {
                module_pk: selectedModule.value,
                title: gradeTitle.value,
                grade: grade.value
            })
                .then(() => {
                    gradeTitle.value = '';
                    emit('get-grades');
                })
                .catch(err => {
                    console.log(err);
                });
        };

        return {
            modules,
            gradeTitle,
            grade,
            selectedModule,
            createGrade
        };
    }
};
</script>

<style scoped>

</style>
