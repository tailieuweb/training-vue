<template>
  <div class="container">
    <h3 class="p-3 text-center">List of products</h3>
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
      <tr v-for="product in products" :key="product.id">
        <td>#</td>
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

export default {
  name: 'products',
  data() {
    return {
      products: [          
      ],
      perPage: 10,
      page: 1,
      total: 0,
    }
  },
  methods: {
    setTotal () {

    },
    getAllProduct() {
      let uri = "http://127.0.0.1:8000/products";
      axios.get(uri, { 
        headers: {
          'Access-Control-Allow-Origin': '*',          
        },        
      }).then((response) => {   
        this.products = response.data.data;
      })
    }

  },
  created() {    
    this.setTotal();    
    this.getAllProduct();
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