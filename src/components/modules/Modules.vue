<template>
    <div>
        <CreateModule @get-modules="getModules"/>
        <UpdateModule :module="moduleToUpdate" @get-modules="getModules"/>
        <div class="container">
            <div class="row" v-for="(module, idx) in modules" v-bind:key="idx">
                <div class="">
                    {{ module.name }}
                    <span class="float-end">
                    <button class="btn btn-primary btn-sm m-2"
                            v-on:click="() => changeModuleToUpdate(module)">
                        Update
                    </button>
                    <button class="btn btn-danger btn-sm"
                            v-on:click="deleteModule(module.id)">
                        Delete
                    </button>
                </span>
                    <div class="text-muted">
                        {{ module.description }}
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import CreateModule from "@/components/modules/CreateModule.vue";
import UpdateModule from "@/components/modules/UpdateModule.vue";

export default {
    name: "modulesList",
    components: {UpdateModule, CreateModule},
    setup() {
        const modules = ref([]);
        const moduleToUpdate = ref({});

        const getModules = () => {
            axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/modules`)
                .then(res => {
                    modules.value = res.data
                })
                .catch(err => {
                    console.log(err)
                });
        }

        const deleteModule = (id) => {
            axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/modules/${id}`)
                .then(() => {
                    getModules();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        const changeModuleToUpdate = (module) => {
            moduleToUpdate.value = module;
            // eslint-disable-next-line no-undef
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                keyboard: false
            });
            myModal.show();
        }

        onMounted(() => {
            getModules();
        });

        return {
            modules,
            moduleToUpdate,
            changeModuleToUpdate,
            getModules,
            deleteModule
        };
    },
}
</script>

<style scoped>

</style>
