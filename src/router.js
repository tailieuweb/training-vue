import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",            
            name: "home",
            component: () => import("./components/Home")
        },
        {
            path: "/products",            
            name: "products",
            component: () => import("./components/ProductList")
        },
        {
            path: "/categories",
            name: "categories",
            component: () => import("./components/CategoryList")
        }
        
    ]
});