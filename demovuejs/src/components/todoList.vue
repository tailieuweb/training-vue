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
      <TodoListWithPagination
        v-bind:searchName="searchName"
        @edit="clickEdit"
        @delete="clickDelete"
        @toggleTodo="toggleTodo"
      />
    </div>
  </div>
</template>

<script>
import editemployee from "../components/addNew";
import TodoListWithPagination from "./paginateTodoList";
export default {
  name: "TodoList",
  data() {
    return {
      list: [
        {
          id: 1,
          title: "Do the dishes",
          description: "Bruschetta- famous appetizer in Italy",
          completed: false,
          date: "Mon Nov 02 2020 17:59:00 GMT+0700 (Giờ Đông Dương)",
        },
        {
          id: 2,
          title: "Take out the trash",
          description: "I take out the garbage",
          completed: false,
          date: "	Sun Nov 01 2020 17:59:00 GMT+0700 (Giờ Đông Dương)",
        },
        {
          id: 3,
          title: "Finish doing laundry",
          description: "Therefore, you need to add water.",
          completed: false,
          date: "	Wed Nov 04 2020 18:00:00 GMT+0700 (Giờ Đông Dương)",
        },
      ],
      employee: null,
      isEdit: false,
      search: "",
      currentSort: "title",
      currentSortDir: "asc",
    };
  },
  computed: {
    searchName: function() {
      return (
        this.sortedCats &&
        this.list.filter((items) => {
          return items.title.toLowerCase().includes(this.search.toLowerCase());
        })
      );
    },
    sortedCats: function() {
      let self = this;
      return self.list.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
  components: {
    editemployee,
    TodoListWithPagination,
  },
  methods: {
    clickAdd() {
      let employee = {
        id: Math.floor(Math.random() * 1000000),
        title: "",
        description: "",
        completed: false,
        date: "",
      };
      this.employee = employee;
      this.isEdit = true;
    },
    clickSave(employee) {
      let index = this.list.findIndex((items) => items.id == employee.id);
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
      let index = this.list.findIndex((items) => items.id == employee.id);
      this.list.splice(index, 1);
    },

    toggleTodo(todo) {
      todo.completed = !todo.completed;
    },
  },
};
</script>
