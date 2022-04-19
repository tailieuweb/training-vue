import axios from "axios";

export const categoryStore = {
    state: {
        categories : [],
        total : 111110,
    },

    getters : {
        getAll : (state) => state.categories,
        getTotal: (state) => state.total
    },

    mutations : {
        setCategories: (state, categories) => (state.categories = categories),
        setTotal : (state, total) => (state.total = total),
    },

    actions : {
        async getCategory({commit}) {
            let url = `http://127.0.0.1:8000/categories`;
            const response = await axios.get(url);

            console.log(response);

            commit("setCategories", response.data);
            commit("setTotal", 10);
        }
    }


};