import {createApp} from 'vue'
import {createPinia} from 'pinia'

import router from './router.js'
import './style.css'
import App from './App.vue'

import {OhVueIcon, addIcons} from "oh-vue-icons";
import {BiSunFill, BiMoonFill, HiSearch, MdKeyboardarrowdown, MdKeyboardbackspace, FaSpinner} from 'oh-vue-icons/icons';

addIcons(BiSunFill, BiMoonFill, HiSearch, MdKeyboardarrowdown, MdKeyboardbackspace, FaSpinner);

createApp(App)
    .use(router)
    .use(createPinia())
    .component("v-icon", OhVueIcon)
    .mount('#app')

