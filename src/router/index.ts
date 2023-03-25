import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {useUserStore} from '@/stores/user';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignupView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/todos',
            name: 'todos',
            component: () => import('../views/TodoView.vue'),
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore();
                if (userStore.isLoggedIn) {
                    next();
                } else {
                    next('/login');
                }
            }
        }
    ]
});

export default router;
