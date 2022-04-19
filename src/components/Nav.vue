<template>
    <div>
        <v-toolbar color="cyan" dark>
            <v-tabs align-with-title>
                <v-tabs-slider color="yellow">                    
                </v-tabs-slider>
                <v-tab v-for="item in items" :key="item.id" :to="item.link">
                    {{item.title}}
                </v-tab>
            </v-tabs>
        </v-toolbar>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {title: "Home", link: "/"},
                    {title: "Products", link: "/products"},
                    {title: "Categories", link: "/categories"}
                ]
            }
        }
    }
</script>
