<template>
    <nav  class="container navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/products" class="nav-link" :class="is_active('products') " >Products</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/categories" class="nav-link" :class="is_active('categories')" > Categories </router-link>
      </li>
    </div>
  </nav>

</template>

<script>
export default {
    name: "Nav",
    methods: {
      is_active(path) {
        if (path == this.$route.name) {
          return 'active';
        }
      }
    }
}
</script>