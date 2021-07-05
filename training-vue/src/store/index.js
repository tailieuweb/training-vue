import Vuex from "vuex";
import Vue from "vue";

import {categoryStore} from "@/store/modules/categories";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        category: categoryStore
    }
});