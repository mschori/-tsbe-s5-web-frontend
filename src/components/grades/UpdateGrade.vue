<template>
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="updateGrade">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update {{ grade.title }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Module</label>
                                <select class="form-select" aria-label="Default select example" v-model="selectedModule"
                                        required>
                                    <option v-for="module in modules" :key="module.id" :value="module.id">{{
                                        module.name
                                        }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="moduleNameInput" class="form-label">Title</label>
                                <input class="form-control" id="moduleNameInput" required
                                       :value="gradeTitleInput"
                                       @input="e => gradeTitleInput = e.target.value"
                                       placeholder="Name your grade">
                            </div>
                            <div class="mb-3">
                                <label for="gradeInput" class="form-label">Grade</label>
                                <input class="form-control" id="gradeInput" required type="number" step="0.1"
                                       :value="gradeInput"
                                       @input="e => gradeInput = e.target.value"
                                       placeholder="Define your grade">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    id="modalCloseButton">
                                Close
                            </button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";

export default {
    name: "UpdateGrade",
    props: {
        grade: {
            type: Object,
            required: true
        }
    },
    setup(props, {emit}) {
        const modules = ref([]);
        const selectedModule = ref('');
        const gradeTitleInput = ref('');
        const gradeInput = ref(4.5);

        onMounted(() => {
            getModules();
        });

        computed(() => {
            return props.grade;
        });

        watch(() => props.grade, (first) => {
            selectedModule.value = first.module.id;
            gradeTitleInput.value = first.title;
            gradeInput.value = first.grade;
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

        const updateGrade = () => {
            axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/grades/${props.grade.id}`, {
                module_pk: selectedModule.value,
                title: gradeTitleInput.value,
                grade: gradeInput.value,
            })
                .then(() => {
                    gradeTitleInput.value = '';
                    gradeInput.value = 4.5;
                    emit('get-grades');
                    document.getElementById('modalCloseButton').click();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        return {
            modules,
            selectedModule,
            gradeTitleInput,
            gradeInput,
            updateGrade
        }
    }
}
</script>

<style scoped>

</style>
