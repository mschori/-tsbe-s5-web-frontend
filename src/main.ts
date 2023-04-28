import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import {enableAxiosInterceptorForJwtToken} from '@/services/axios.service';

// Add jwt interceptor to axios
enableAxiosInterceptorForJwtToken();

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');
