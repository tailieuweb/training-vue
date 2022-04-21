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

            <div class="dialog-message">
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
                <input type="file" :disable="action == 'show-product' ? true : false" class="form-control mt-2"
                  v-on:change="onFileChange" />
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
      message: {
        default: null,
        type: String
      },
      file: null
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
    onFileChange(e) {
      console.log(e.target.files[0]);
      this.file = e.target.files[0];
    },

  }
}
</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>