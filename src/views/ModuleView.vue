<template>
    <div>
        <h1>Modules</h1>
        <ModulesList/>
    </div>
</template>

<script>
import ModulesList from "@/components/modules/Modules.vue";

export default {
    name: "ModuleView",
    components: {ModulesList},
    setup() {
        return {};
    },
}
</script>

<style scoped>

</style>
