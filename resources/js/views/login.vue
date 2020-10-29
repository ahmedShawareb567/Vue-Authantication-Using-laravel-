<template>
    <div>
        <section class="loginSection">
            <div class="container">
                <div class="login-title">
                    <h4>Login</h4>
                </div>
                <div class="row">
                    <form class="form" method="POST">
                        <div class="offset-md-2 col-md-8 offset-sm-1 col-sm-10">
                            <div class="row">
                                <div class="col-12 form-group">
                                    <input type="text" class="form-control" v-model="form.email">
                                </div>
                                <div class="col-12 form-group">
                                    <input type="password" class="form-control" v-model="form.password">
                                </div>
                                <div class="col-12 form-group">
                                    <button @click.prevent="login()" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div v-if="authanticated">
                        {{role}}
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: "login",
    data() {
        return {
            form: {
                email   : null,
                password: null
            }
        }
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
            auth : 'auth/checkAuthanticated'
        }),
        login(){
            this.auth(this.form).then(() => {
                this.$toast.info(`Sucess, welcome ${this.user['name']}`);
                this.$router.replace({
                    name: 'Dashboard'
                }).catch(()=>{});
            });
        }
    }
};
</script>

<style scoped>

</style>
