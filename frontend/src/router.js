import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Starter from "./views/Starter.vue";
import Home from "./views/Home.vue";
import Board from "./views/Board.vue";
import News from "./views/News.vue";
import CustomComponents from "./views/CustomComponents.vue";

import JesusdreamHeader from "./views/jesusdream/JesusdreamHeader.vue";
import JesusdreamIndex from "./views/jesusdream/JesusdreamIndex.vue";
import JesusdreamFooter from "./views/jesusdream/JesusdreamFooter.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/jesusdream",
            name: "jesusdream",
            components: {
                header: JesusdreamHeader,
                default: JesusdreamIndex,
                footer: JesusdreamFooter
            }
        },
        {
            path: "/",
            name: "Starter",
            components: {
                header: AppHeader,
                default: Starter,
                footer: AppFooter
            }
        }, {
            path: "/home",
            name: "home",
            components: {
                header: AppHeader,
                default: Home,
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
        },
        {
            path: "/Board",
            name: "Board",
            components: {
                header: AppHeader,
                default: Board,
                footer: AppFooter
            }
        },
        {
            path: "/News",
            name: "News",
            components: {
                header: AppHeader,
                default: News,
                footer: AppFooter
            }
        },
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});