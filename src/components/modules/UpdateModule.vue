<template>
    <div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="updateModule">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update {{ module.name }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="moduleNameInput" class="form-label">Name</label>
                                <input class="form-control" id="moduleNameInput" required
                                       :value="moduleNameInput"
                                       @input="e => moduleNameInput = e.target.value"
                                       placeholder="Name your module">
                            </div>
                            <div class="mb-3">
                                <label for="moduleDescriptionInput" class="form-label">Description</label>
                                <input class="form-control" id="moduleDescriptionInput" required
                                       :value="moduleDescriptionInput"
                                       @input="e => moduleDescriptionInput = e.target.value"
                                       placeholder="Describe your module">
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
import {computed, ref, watch} from "vue";
import axios from "axios";

export default {
    name: "UpdateModule",
    props: {
        module: {
            type: Object,
            required: true
        }
    },
    setup(props, {emit}) {
        const moduleNameInput = ref('');
        const moduleDescriptionInput = ref('');

        computed(() => {
            return props.module;
        });

        watch(() => props.module, (first) => {
            moduleNameInput.value = first.name;
            moduleDescriptionInput.value = first.description;
        });

        const updateModule = () => {
            axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/modules/${props.module.id}`, {
                name: moduleNameInput.value,
                description: moduleDescriptionInput.value,
            })
                .then(() => {
                    moduleNameInput.value = '';
                    moduleDescriptionInput.value = '';
                    emit('get-modules');
                    document.getElementById('modalCloseButton').click();
                })
                .catch(err => {
                    console.log(err)
                });
        }

        return {
            moduleNameInput,
            moduleDescriptionInput,
            updateModule
        }
    }
}
</script>

<style scoped>

</style>
