<template>
  <div class="form">
    <form>
      <div class="form-group">
        <label for="InputName">Title</label>
        <input
          type="text"
          class="form-control"
          id="InputName"
          v-model="employee.title"
        />
      </div>
      <div class="form-group">
        <label for="InputAge">Description</label>
        <input
          type="text"
          class="form-control"
          id="InputAge"
          v-model="employee.description"
        />
      </div>
      <div class="form-group">
        <label for="InputTel">Date</label>
        <Datepicker
          v-model="employee.date"
          lang="en"
          type="date"
          format="dd-MM-yyyy"
          placeholder="dd-mm-yyyy"
        ></Datepicker>
      </div>
      <button class="btn btn-primary" @click="clickSave()">Save</button>
    </form>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
export default {
  name: "editemployee",
  data() {
    return {
      previewImage: null,
    };
  },
  props: {
    employee: Object
  },
  methods: {
    clickSave() {
      this.$emit("save", this.employee);
    }
  },
  components: {
    Datepicker
  }
};
</script>
<style >
.form {
  margin-top: 40px;
  margin-bottom: 50px;
}
.uploading-image {
  width: 30%;
  height: 30%;
}
</style>
