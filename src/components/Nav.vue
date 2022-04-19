<template>
  <nav  class="container navbar navbar-expand navbar-dark bg-dark">    
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link"  :class="is_active('home') " >Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" :class="is_active('products') " >Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/categories" class="nav-link" :class="is_active('categories')" > Categories </router-link>
        </li>
      </ul>
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