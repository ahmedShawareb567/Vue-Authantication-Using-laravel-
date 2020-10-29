<template>
<div>
    <div v-if="authanticated">
    <router-link to="/">Home</router-link>
    </div>
    <router-link to="/about">About</router-link>
    <div v-if="!authanticated">
    <router-link to="/login">Login</router-link>
    </div>
    <div v-if="role == 'admin'">
    <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <div v-if="authanticated">
    <p @click="signOut()">SignOut</p>
    </div>
    <main>
        <router-view/>
    </main>
    <vue-progress-bar></vue-progress-bar>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
name: "app.vue",
    mounted(){
        this.$Progress.finish();
    },
    created(){
        this.$Progress.start();
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress
                // parse meta tags
                this.$Progress.parseMeta(meta)
            }
            //  start the progress bar
            this.$Progress.start()
            //  continue to next page
            next()
        });
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
            this.$Progress.finish()
        });
    },
    computed:{
        ...mapGetters({
            authanticated: 'auth/authanticated',
            user: 'auth/getUser',
            role: 'auth/getRole'
        }),
    },
    methods: {
    ...mapActions({
        logout: 'auth/signOut'
    }),
        signOut(){
            this.logout().then(() => {
                this.$toast.error(`Goodbye`);
                this.$router.replace({
                    name: 'Login'
                }).catch((e) => {});
            });
        }
    }
}
</script>

<style lang="scss">
    .toast-notification{
        .Vue-Toastification__toast{
            min-height: 70px !important;
            min-width: 250px !important;
        }
    }
</style>
