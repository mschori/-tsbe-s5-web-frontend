<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">TSBE-S5</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/todos" class="nav-link">My Todos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/modules" class="nav-link">Modules</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!userStore.isLoggedIn">
                        <RouterLink to="/signup" class="nav-link">Sign Up</RouterLink>
                    </li>
                    <li class="nav-item" v-if="!userStore.isLoggedIn">
                        <RouterLink to="/login" class="nav-link">Login</RouterLink>
                    </li>
                </ul>
                <div v-if="userStore.isLoggedIn">
                    <button class="btn btn-sm btn-warning" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {useUserStore} from "@/stores/user";

export default {
    name: "NavigationBar",

    setup() {
        const userStore = useUserStore();
        const logout = () => {
            userStore.resetUser();
        }

        return {
            logout,
            userStore
        }
    }
}
</script>

<style scoped>

</style>
