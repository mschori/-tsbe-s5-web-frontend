import axios from 'axios';
import {useUserStore} from '@/stores/user';

/**
 * Add jwt interceptor to axios
 */
export function enableAxiosInterceptorForJwtToken() {
    axios.interceptors.request.use(request => {
        const userStore = useUserStore();

        // add auth header with jwt if account is logged in and request is to the api url
        const isApiUrl = request.url?.startsWith(import.meta.env.VITE_BACKEND_BASE_URL);

        if (userStore.isLoggedIn && isApiUrl !== undefined && isApiUrl) {
            request.headers.Authorization = `Bearer ${userStore.accessToken}`;
        }

        return request;
    });
}
