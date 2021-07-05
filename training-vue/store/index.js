import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

import categories from './modules/categories'

Vue.use(Vuex)

const initialState = {

}

export default new Vuex.Store({
    strict: true,
    state: initialState,
    getters,
    mutations,
    actions,
    modules: {
        categories
    }

})