<template>
    <div>
        <CreateGrade @get-grades="getGrades"/>
        <UpdateGrade :grade="gradeToUpdate" @get-grades="getGrades"/>
        <div class="container">
            <div class="row" v-for="(grade, idx) in grades" v-bind:key="idx">
                <div class="">
                    <b>({{ grade.module.name }})</b> {{ grade.title }}: {{ grade.grade }}
                    <span class="float-end">
                    <button class="btn btn-primary btn-sm m-2"
                            v-on:click="() => changeGradeToUpdate(grade)">
                        Update
                    </button>
                    <button class="btn btn-danger btn-sm"
                            v-on:click="deleteGrade(grade.id)">
                        Delete
                    </button>
                </span>
                </div>
                <hr/>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import CreateGrade from "@/components/grades/CreateGrade.vue";
import UpdateGrade from "@/components/grades/UpdateGrade.vue";

export default {
    name: "GradesList",
    components: {CreateGrade, UpdateGrade},
    setup() {
        const grades = ref([]);
        const gradeToUpdate = ref({});

        const getGrades = () => {
            axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/grades`)
                .then(res => {
                    grades.value = res.data
                })
                .catch(err => {
                    console.log(err)
                });
        }

        const changeGradeToUpdate = (grade) => {
            gradeToUpdate.value = grade;
            // eslint-disable-next-line no-undef
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
        }

        const deleteGrade = (id) => {
            axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/grades/${id}`)
                .then(() => {
                    getGrades();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        onMounted(() => {
            getGrades();
        });

        return {
            grades,
            gradeToUpdate,
            getGrades,
            changeGradeToUpdate,
            deleteGrade
        };
    }
}
</script>

<style scoped>

</style>
