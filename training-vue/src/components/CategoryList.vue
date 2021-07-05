<template>
    <div>
        List of categories
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "CategoriesList",
        data () {
            return {

            }
        },
        computed : {
            ...mapGetters({
                categories: "getAll",
                total : "getTotal",                
            }),
        },
        methods : {
            ...mapActions(["getCategory"]),
        },
        created() {
            console.log(this.total);
            this.getCategory();
            console.log(this.categories);
        }
    }
</script>
