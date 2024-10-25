<script setup>
  import NavbarComponent from "./components/NavbarComponent.vue";
  import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div class="flex flex-col min-vh-100">
    <NavbarComponent/>
    <main class="flex-grow-1">
      <RouterView/>
    </main>
    <FooterComponent/>
  </div>
</template>

<style scoped>

</style>
