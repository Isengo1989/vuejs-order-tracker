import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/home",
            name: "home",
            component: () => import("./components/Home")
        },
        {
            path: "/list",
            name: "list",
            component: () => import("./components/OrderList")
        },
        {
            path: "/maps",
            name: "maps",
            component: () => import("./components/MapsList")
        }
    ]
});
