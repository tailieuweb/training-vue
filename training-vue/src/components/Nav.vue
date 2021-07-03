<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/products" class="nav-link" >Products</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/categories" class="nav-link" > Categories </router-link>
      </li>
    </div>
  </nav>

</template>

<script>
export default {
    name: "Nav"
}
</script>