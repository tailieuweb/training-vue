<template>
  <div id="app">
    <div class="add">
      <div class="input-group md-form form-sm form-2 pl-0">
        <div><p style=" font-size: 25px; " class="title">Todo List</p></div>
        <div class="search">
          <input
            v-model="search"
            class="form-control my-0 py-1"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div class="addnew">
          <button type="button" class="btn btn-add-new" @click="clickAdd()">
            NEW TODO
          </button>
        </div>
      </div>
      <div class="container">
        <editemployee
          :employee="employee"
          @save="clickSave"
          v-if="isEdit"
        ></editemployee>
      </div>
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
                done: item.completed
              }"
            >
              {{ item.title }}
            </td>
            <td
            class="item-desc"
              @click="toggleTodo(item)"
              :class="{
                done: item.completed
              }"
            >
              {{ item.description }}
            </td>
            <td
            class="item-date"
              @click="toggleTodo(item)"
              :class="{
                done: item.completed
              }"
            >
              {{ item.date }}
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="clickEdit(item)"
              >
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
  </div>
</template>

<script>
import editemployee from "./components/addNew";
import Paginate from "vuejs-paginate";
// import moment from "vue-moment";
export default {
  name: "App",
  data() {
    return {
      selec: "example1",
      Example: "hello",
      list: [
        {
          id: 1,
          title: "Do the dishes",
          description: "Bruschetta- famous appetizer in Italy",
          completed: false,
          date: "Mon Nov 02 2020 17:59:00 GMT+0700 (Giờ Đông Dương)"
        },
        {
          id: 2,
          title: "Take out the trash",
          description: "I take out the garbage",
          completed: false,
          date: "	Sun Nov 01 2020 17:59:00 GMT+0700 (Giờ Đông Dương)"
        },
        {
          id: 3,
          title: "Finish doing laundry",
          description: "Therefore, you need to add water.",
          completed: false,
          date: "	Wed Nov 04 2020 18:00:00 GMT+0700 (Giờ Đông Dương)"
        }
      ],
      employee: null,
      isEdit: false,
      search: "",
      array: [],
      cats: [],
      currentSort: "title",
      currentSortDir: "asc",
      currentPage: 1,
      itemsPerPage: 3,
      resultCount: 1
    };
  },
  computed: {
    searchName: function() {
      return (
        this.sortedCats &&
        this.list.filter(items => {
          return (
            items.title.toLowerCase().includes(this.search.toLowerCase())
          );
        })
      );
    },
    sortedCats: function() {
      return this.list.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate: function() {
      if (
        !this.searchName ||
        this.searchName.length != this.searchName.length
      ) {
        return;
      }
      this.resultCount = this.searchName.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.searchName.slice(index, index + this.itemsPerPage);
    }
  },
  components: {
    editemployee: editemployee,
    Paginate: Paginate
  },
  methods: {
    clickAdd() {
      let employee = {
        id: Math.floor(Math.random() * 1000000),
        title: "",
        description: "",
        completed: false,
        date: ""
      };
      this.employee = employee;
      this.isEdit = true;
    },
    clickSave(employee) {
      let index = this.list.findIndex(items => items.id == employee.id);
      if (index >= 0) {
        this.list.splice(index, 1, employee);
      } else {
        this.list.push(employee);
      }

      this.isEdit = false;
    },
    clickEdit(employee) {
      this.employee = JSON.parse(JSON.stringify(employee));
      this.isEdit = true;
    },
    clickDelete(employee) {
      let index = this.list.findIndex(items => items.id == employee.id);
      this.list.splice(index, 1);
    },
    sort: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
        console.log(this.currentSortDir);
      }
      this.currentSort = s;
    },
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
  margin-bottom: 30px;
}

#comp {
  margin-top: 50px;
}
.add {
  margin-top: 30px;
  margin-left: 5%;
  margin-right: 5%;
}

.input-group.md-form.form-sm.form-1 input {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: #7093f3;
}

.input-group {
  margin-bottom: 10px;
  border-radius: 7px;
  background-color: #7093f3;
  padding: 5px;
}
.btn-add-new {
  background-color: #fff;
  color: #000;
}
.table {
  border-style: solid;
  border-color: #7093f3;
  cursor: pointer;
}
.img {
  width: 50%;
  height: 30%;
}
.addnew {
  margin: 20px;
}
.search {
  margin: 20px;
  margin-left: -5px;
  width: 72%;
}
.title {
  font-size: 25px;
  margin: 20px;
}
.done {
  text-decoration: line-through;
}
ul{
  list-style: none;
    display: flex;
    justify-content: center
}
li{
  padding: 8px 15px;
    background-color: #7093f3;
    border-radius: 5px;
    margin-right: 5px;
}
a{
      text-decoration: none !important;
      color: #000;
}
.item-title {
  width: 200px;
  word-break: break-all;
}
.item-desc {
  width: 400px;
  word-break: break-all;
}
.item-date {
  width: 450px;
  word-break: break-all;
}
</style>
