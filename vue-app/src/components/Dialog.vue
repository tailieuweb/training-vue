<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <!-- Form element -->
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="dialog-message" v-if="message">
              {{ message }}
            </div>

            <div class="modal-body">
              <!-- Title -->
              <div class="form-group text-left">
                <label for="name">Title:</label>
                <input id="title" type="text" v-model="product.title"
                  :disabled="action == 'show-product' ? true : false" required class="form-control" />
              </div>
              <!-- Description -->
              <div class="form-group text-left">
                <label for="description">Description:</label>
                <textarea v-model="product.description" :disabled="action == 'show-product' ? true : false" required
                  class="form-control">
                </textarea>
              </div>

              <!-- Image -->
              <div class="form-group text-left">
                <label for="image">Image</label>
                <input 
                  type="file" 
                  :disable="action == 'show-product' ? true : false" 
                  class="form-control mt-2"
                  v-on:change="onFileChange" 
                  accept="image/*"
                />
              </div>

              <!-- Preview Image -->
              <div class="form-group text-left preview-image" v-if="previewImage.url">
                <div class="row">
                  <div class="col-md-4" >
                     <img :src="previewImage.url" />
                  </div>
                  <div class="col-md-8" v-if="previewImage.name">
                    <span>Name: {{previewImage.name}}</span><br>
                    <span>Type: {{previewImage.type}}</span><br>
                    <span>Size: {{previewImage.size}}</span><br>
                  </div>
                </div>
                  

              </div>
            </div>

            <div class="modal-footer">
              <button class="modal-default-button btn btn-outline-success" @click="$emit('close')">
                Close
              </button>
              <button v-if="action != 'show-product'" class="modal-default-button btn btn-outline-primary"
                @click="onHandle">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dialog",
  data() {
    return {
      message: null,
      file: null,
      // preview image
      previewImage: {
        url: null,
        title: null,
        size: null,
        type: null
      },
    }
  },
  props: {
    product: {
      default: null,
      type: Object
    },
    action: {
      default: null,
      type: String
    }
  },
  methods: {
    //edit product
    editProduct() {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("title", this.product.title);
      formData.append("description", this.product.description);
      formData.append("image", this.file);


      let uri = "http://127.0.0.1:8000/products/" + this.product.id;
      console.log(uri);
      axios.post(uri, formData, config).then((response) => {
        if (response.data.success) {
          this.message = 'Update successful';
        } else {
          this.message = 'Update failed';
        }
      });

    },
    //add product
    addProduct() {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      let formData = new FormData();
      formData.append("title", this.product.title);
      formData.append("description", this.product.description);
      formData.append("image", this.file);


      let uri = "http://127.0.0.1:8000/products";
      console.log(uri);
      axios.post(uri, formData, config).then((response) => {
        if (response.data.success) {
          this.message = 'Add successful';
        } else {
          this.message = 'Add failed';
        }
      });

    },
    onHandle() {
      if (this.action == 'edit-product') {
        this.editProduct();
      } else if (this.action == 'add-product') {
        this.addProduct();
      }
    },
    /**
     * Select file: send to server when submitting, preview selected image
     * @param {*} e 
     */
    onFileChange(e) {
      console.log(e.target.files[0]);      
      this.file = e.target.files[0];

      // Preview selected image
      this.previewImage.url = URL.createObjectURL(this.file);
      this.previewImage.name = this.file.name;
      this.previewImage.size = this.file.size;
      this.previewImage.type = this.file.type;
    },

  },//end method

  created() {
    //Set preview image
    console.log(this.product);
    if (this.product.image) {
      this.previewImage.url = 'http://127.0.0.1:8000/upload/' + this.product.image;
    }
  },//end created
}
</script>


<style>

</style>