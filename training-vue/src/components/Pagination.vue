<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    
    <li v-for="link in attrs.links" :key="link" @click="btnLink(link)" class="page-item">
        <a class="page-link" href="#">
            {{link}}
        </a>
    </li>
        
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
                per_page : 2,
                items : 0,
                links : 0,
                page : 1
            }, 
            products : [],
            sub_products: []
        }
    },
    methods: {
        btnLink(link) {
            console.log(link);
            this.setProductsOnPage(link);
        },
        setAttributes() {
            EventBus.$on('eGetProducts', (products) => {
                console.log('loadProducts');
                console.log(products);

                //set products
                this.products = products;
                //set items
                this.attrs.items = products.length;
                //set links
                if (products.length > 0) {
                    this.attrs.links = Math.ceil(products.length / this.attrs.per_page);
                }
                
                //show attrs
                console.log(this.attrs);
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

            EventBus.$emit('eSetProductsOnPage', this.sub_products);
            console.log('setProductsOnPage');
            console.log(this.sub_products);
        }
    },
    created() {
        this.setAttributes();        
    }

}
</script>

<style>

</style>