import axios from "axios";

export const categoryStore = {
    /**
     * Immutable data: cannot access
     */
    state: {
        categories : [],
        total : 0,
    },

    /**
     * Return state
     */
    getters : {
        getAll : (state) => state.categories,
        getTotal: (state) => state.total
    },

    /**
     * Chnage state
     */
    mutations : {
        setCategories: (state, categories) => (state.categories = categories),
        setTotal : (state, total) => (state.total = total),
    },

    /**
     * Available functions
     */
    actions : {
        async getCategories({commit}) {
              
            let url =  `http://127.0.0.1:8000/categories`;
            const response = await axios.get(url);


            console.log(response);

            commit("setCategories", response.data.data);
            commit("setTotal", response.data.data.length);
        }
    }
};