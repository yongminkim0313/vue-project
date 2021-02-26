import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import AppHeader from "./layout/starter/StarterHeader";
import AppFooter from "./layout/starter/StarterFooter";
import Starter from "./views/Starter.vue";
import CustomComponents from "./views/CustomComponents.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "components",
            components: {
                header: AppHeader,
                default: Starter,
                footer: AppFooter
            }
        },
        {
            path: "/landing",
            name: "landing",
            components: {
                header: AppHeader,
                default: Landing,
                footer: AppFooter
            }
        },
        {
            path: "/login",
            name: "login",
            components: {
                header: AppHeader,
                default: Login,
                footer: AppFooter
            }
        },
        {
            path: "/register",
            name: "register",
            components: {
                header: AppHeader,
                default: Register,
                footer: AppFooter
            }
        },
        {
            path: "/profile",
            name: "profile",
            components: {
                header: AppHeader,
                default: Profile,
                footer: AppFooter
            }
        },
        {
            path: "/CustomComponents",
            name: "customComponents",
            components: {
                header: AppHeader,
                default: CustomComponents,
                footer: AppFooter
            }
        }
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});