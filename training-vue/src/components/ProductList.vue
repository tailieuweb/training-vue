<template>
  <div class="container">
    <h3 class="p-3 text-center">List of products</h3>    
    <Pagination v-bind:counter.sync="counter"/>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>        
        <th>Image</th>
        <th>Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in sub_products" :key="product.id">
        <td>{{counter + index + 1}}</td>
        <td>{{ product.title }}</td>        
        <td>
          <img v-if="product.image" class="product-image" :src="`http://127.0.0.1:8000/upload/${product.image}`" />
          <img v-else class="product-image" :src="`http://127.0.0.1:8000/upload/nothumb.jpg`" />
        </td>
        <td>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;
          <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;
          <i class="fa fa-clone" aria-hidden="true"></i>
        </td>
      </tr>
      </tbody>
    </table>    
  </div>
</template>

<script>
import axios from "axios";
import {EventBus} from '../main';
import Pagination from './Pagination.vue';

export default {
  components: { Pagination },
  name: 'products',
  data() {
    return {
      products: [],      
      sub_products: [],
      counter: 1    
    }
  },
  methods: {
    
    getProducts() {
      let uri = "http://127.0.0.1:8000/products";
      axios.get(uri, { 
        headers: {
          'Access-Control-Allow-Origin': '*',          
        },        
      }).then((response) => {           
        this.products = response.data.data;

        //EventBus
        EventBus.$emit("eGetProducts", this.products);
      })
    },
    getSubProduts() {
      EventBus.$on('eSetProductsOnPage', (_products) => {        
        this.sub_products = _products.sub_products;
        //this.counter = _products.counter;
      })
    }

  },
  created() {        
    this.getProducts();
    this.getSubProduts();   
  },
  mounted() {

  }
}
</script>

<style>
.product-image {
  max-width: 100px;
  height: 50px;
}
</style>