import { createWebHistory, createRouter } from "vue-router";

import App from "./App.vue";
import Vuetify from "./components/Vuetify.vue";
import { RedirectLogin } from "./utils/manejo_errores.js";
import Main from "./views/Main.vue";
import Admin from "./views/Admin.vue";

const routes = [
    {
        path: '/', component: Main
    },
    {
        path: '/main', component: Main
    },
    {
        path: '/sesion', component: Vuetify
    },
    {
        path: '/admin', component: Admin
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

/* ====== USAR ESTA FUNCION EN LA DECLARACION DE LA RUTA SI SE REQUIERE UN TOKEN (beforeEnter) ======= */
function requireAuth(to, from, next){
    const token = localStorage.getItem('token');
    if(token){
        next();
    }else{
        RedirectLogin();
    }
}

export default router;
