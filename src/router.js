import Home from './views/Home.vue'
import Country from './views/Country.vue'
import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/country/:code', name: 'country', component: Country},
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
