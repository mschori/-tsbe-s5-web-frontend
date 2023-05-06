<template>
    <div>
        <h1>Grades</h1>
        <GradesList/>
    </div>
</template>

<script>
import GradesList from "@/components/grades/Grades.vue";

export default {
    name: "GradeView",
    components: {GradesList}
}
</script>

<style scoped>

</style>
