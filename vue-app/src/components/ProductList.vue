<template>
  <div class="container">
    <h3 class="p-3 text-center">List of products</h3>

    <Dialog v-if="dialog.showModal" 
      @close="closeDialog()" 
      :product="dialog.product" 
      :action="dialog.action">
      <h3 slot="header" v-if="dialog.action === 'add-product'">Add product</h3>
      <h3 slot="header" v-if="dialog.action === 'edit-product'">Edit product</h3>
      <h3 slot="header" v-if="dialog.action === 'show-product'">Show product</h3>

    </Dialog>

    <button class="btn btn-info" @click="openDialog({}, 'add-product')">
      <i class="fa fa-plus"></i>
    </button>

    <div>
      {{ message }}
    </div>

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
          <td>{{ counter + index + 1 }}</td>
          <td>{{ product.title }}</td>
          <td>
            <img v-if="product.image" class="product-image" :src="`${baseUrl}/upload/${product.image}`" />
            <img v-else class="product-image" :src="`${baseUrl}/upload/nothumb.jpg`" />
          </td>
          <td>
            <!-- View -->
            <a href="#" @click="openDialog(product, 'show-product')">
              <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;
            </a>
            <!-- Edit -->
            <a href="#" @click="openDialog(product, 'edit-product')">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;
            </a>
            <!-- Delete -->
            <i class="fa fa-trash" aria-hidden="true"></i>

          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :counter.sync="counter" />
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '../main';
import Pagination from './Pagination.vue';
import Dialog from "./Dialog.vue";
export default {
  components: { 
    Pagination,
    Dialog 
  },
  name: 'products',
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      dialog: {        
        showModal: false,
        action: 'add-product',
        product: {},
      },
      products: [],
      sub_products: [],
      counter: 1,
      message: null
    }
  },
  methods: {
    // Open Dialog
    openDialog(product, action) {
      console.log('opendialog');
      this.dialog.product = product;
      this.dialog.action = action;
      this.dialog.showModal = true;
    },

    // Close Dialog
    closeDialog() {
      this.getProducts();
      this.getSubProduts();
      this.dialog.showModal = false;
    },

    // Get list of products
    getProducts() {
      let uri = this.baseUrl + "/products";
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

    // Get sub-list of products
    getSubProduts() {
      EventBus.$on('eSetProductsOnPage', (_products) => {
        this.sub_products = _products.sub_products;
      })
    },
  },
  created() {
    console.log(process.env);
    this.getProducts();
    this.getSubProduts();
  },
  mounted() {

  }
}
</script>

<style>

</style>