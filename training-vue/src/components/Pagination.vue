<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">

        <li class="page-item" @click="btnPrev()">
            <a class="page-link" href="#">Previous</a>
        </li>
        
        <li v-for="link in attrs.links" :key="link" @click="btnLink(link)" class="page-item">
            <a class="page-link" href="#">
                {{link}}
            </a>
        </li>
            
        <li class="page-item" @click="btnNext()">
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>
</nav>
</template>

<script>
import {EventBus} from "../main";
export default {
    name: "Pagination",
    props: {

    },
    data() {
        return {
            attrs : {
                per_page : 5,
                items : 0,
                links : 0,
                page : 1
            }, 
            products : [],
            sub_products: []
        }
    },
    methods: {
        btnPrev() {
            if (this.attrs.page > 1) {
                this.attrs.page = this.attrs.page - 1;
            }            
            this.setProductsOnPage(this.attrs.page);
        },
        btnNext() {
            if (this.attrs.page <= this.attrs.links - 1) {
                this.attrs.page = this.attrs.page + 1;
            }            
            this.setProductsOnPage(this.attrs.page);
        },
        btnLink(link) {  
            this.attrs.page = link;          
            this.setProductsOnPage(link);
        },
        setAttributes() {
            EventBus.$on('eGetProducts', (products) => {                
                //set products
                this.products = products;
                //set items
                this.attrs.items = products.length;
                //set links
                if (products.length > 0) {
                    this.attrs.links = Math.ceil(products.length / this.attrs.per_page);
                }
                
                //show attrs            
                this.setProductsOnPage(1);
            });
        },
        setProductsOnPage(page) {
            if (page < 1) {
                page = 1;
            }
            var toIndex = page * this.attrs.per_page;
            var fromIndex = toIndex - this.attrs.per_page;
            
            this.sub_products = this.products.slice(fromIndex, toIndex);

            EventBus.$emit('eSetProductsOnPage', {
                    sub_products: this.sub_products, 
                    counter: page * this.attrs.per_page - this.attrs.per_page
                });             

        }
    },
    created() {
        this.setAttributes();        
    }

}
</script>

<style>

</style>