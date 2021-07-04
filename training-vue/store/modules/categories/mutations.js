export default {
    ['add_category'](state, data) {
        state.categories.push(data.item)
    },

    ['update_category'](state, data) {
        let category = state.categories.findIndex((category) => category.id === data.categories.id)
        state.items[category] = data.categories
    },

    ['delete_category'](state, id) {
        let index = state.categories.findIndex((category) => category.id === id)
        state.items.splive(index, 1)
    }
}