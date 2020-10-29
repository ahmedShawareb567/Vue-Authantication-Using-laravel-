import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    closeButton: false,
    icon: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
    containerClassName: 'toast-notification',
    timeout: 1500
};


Vue.use(Toast, options);
