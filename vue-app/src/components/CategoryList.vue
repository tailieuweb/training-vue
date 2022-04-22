<template>
    <div class="container">
        <h3 class="p-3 text-center">List of categories</h3>
        
        <button class="btn btn-info">
            <i class="fa fa-plus"></i>
        </button>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category name</th>
                    <th>Image</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id">
                    <td>#</td>
                    <td>{{category.title}}</td>
                    <td>
                        <img v-if="category.image" class="product-image" :src="`${baseUrl}/upload/${category.image}`" />
                        <img v-else class="product-image" :src="`${baseUrl}/upload/nothumb.jpg`" />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "CategoriesList",
        data () {
            return {
                baseUrl: process.env.VUE_APP_API_BASE_URL,
            }
        },
        computed :{
            ...mapGetters({
                categories: "getAll",
                total : "getTotal",                
            }),        
        },

        methods : {
            ...mapActions(["getCategories"]),
        },
        created() {                    
            this.getCategories(); 
        }
    }
</script>