<template>
  <div>
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col"><a href="#" @click="sort('title')">Title</a></th>
        <th scope="col">
          <a href="#" @click="sort('description')">Description</a>
        </th>
        <th scope="col"><a href="#" @click="sort('date')">Date</a></th>
        <th scope="=col">Selection</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in paginate" :key="item.id">
        <td
          class="item-title"
          @click="toggleTodo(item)"
          :class="{
            done: item.completed,
          }"
        >
          {{ item.title }}
        </td>
        <td
          class="item-desc"
          @click="toggleTodo(item)"
          :class="{
            done: item.completed,
          }"
        >
          {{ item.description }}
        </td>
        <td
          class="item-date"
          @click="toggleTodo(item)"
          :class="{
            done: item.completed,
          }"
        >
          {{ item.date }}
        </td>
        <td>
          <button type="button" class="btn btn-danger" @click="clickEdit(item)">
            Edit
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="clickDelete(item)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
      <div class="page">
      <ul>
        <li v-for="pageNumber in totalPages" v-bind:key="pageNumber">
          <a
            v-bind:key="pageNumber"
            href="#"
            @click="setPage(pageNumber)"
            :class="{
              current: currentPage === pageNumber,
              last:
                pageNumber == totalPages &&
                Math.abs(pageNumber - currentPage) > 3,
              first: pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3
            }"
            >{{ pageNumber }}</a
          >
        </li>
      </ul>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      resultCount: 2,
    };
  },
  props: {
    searchName: Array
  },
  computed: {
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate: function() {
      let self = this;
      if (
        !this.searchName ||
        this.searchName.length != this.searchName.length
      ) {
        return;
      }
      self.resultCount = this.searchName.length;
      if (this.currentPage >= this.totalPages) {
        self.currentPage = this.totalPages;
      }
      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.searchName.slice(index, index + this.itemsPerPage);
    },
  },
  methods: {
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
    },
    sort: function(s) {
     this.$emit("sort", s);
    },
    clickEdit(item) {
      this.$emit("edit", item);
    },
    clickDelete(item) {
      this.$emit("delete", item);
    },
    
    toggleTodo(item) {
      this.$emit("toggleTodo", item);
    }
  },
};
</script>
