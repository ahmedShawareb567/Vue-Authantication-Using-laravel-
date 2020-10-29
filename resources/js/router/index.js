import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index.js';

//VIEWS
import Home from "../views/front/home.vue";
import About from "../views/front/about.vue";
import Login from "../views/login.vue";
import Dashboard from "../views/admin/dashboard.vue";

//USE
Vue.use(VueRouter);

//PROGRESS VARIABLE
const progressProp = {
    func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
    ]
};

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta:{
            title: 'Home',
            progress: progressProp
        },
    },
    {
        path: "/about",
        name: "About",
        component: About,
        meta:{
            title: 'About',
            progress: progressProp
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta:{
            title: 'Login',
            progress: progressProp
        },
        beforeEnter: (to, from, next) => {
            if(store.getters['auth/authanticated']) {
                router.go(-1);
            }
            next();
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta:{
            title: 'Dashboard',
            progress: progressProp
        },
        beforeEnter: (to, from ,next) => {
            if(store.getters['auth/getRole'] != 'admin') {
                if (store.getters['auth/role'] == 'user') {
                    return next ({
                        name: 'Login'
                    });
                } else {
                    return next({
                        name: 'Home'
                    });
                }
            }
            return next();
        }
    },
];


const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

//SET TITLE FOR PAGE
router.afterEach((to, from) => {
    document.title = to.meta.title;
});

//EXPORT ROUTER
export default router;
