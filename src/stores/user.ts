import {defineStore} from 'pinia';
import type IUser from '@/interfaces/IUser';

export const useUserStore = defineStore('user', {
    state: () => ({
        firstname: '',
        lastname: '',
        email: '',
        accessToken: '',
        refreshToken: '',
        isLoggedIn: false
    }),

    getters: {
        getUser: (state) => state
    },

    actions: {
        setUser(user: IUser) {
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.accessToken = user.accessToken;
            this.refreshToken = user.refreshToken;
        }
    },

    persist: true
});
