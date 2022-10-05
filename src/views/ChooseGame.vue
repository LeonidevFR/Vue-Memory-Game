<template>
  <TheHeader></TheHeader>
  <div class="flex justify-center">
    <h1 class="text-3xl font-bold text-purple-300 mb-8 mt-10">
      What game do you want to play ?
    </h1>
  </div>
  <div class="flex justify-center">
    <span
      class="btn-primary w-[250px] mx-4"
      @click="$router.push({ name: 'memory-simon-says' })"
    >
      Simon Says
    </span>
    <span
      class="btn-primary w-[250px] mx-4"
      @click="$router.push({ name: 'memory-numbers' })"
    >
      Numbers Memory
    </span>
  </div>
</template>
<script setup>
import TheHeader from "../components/TheHeader.vue";
</script>
<style lang=""></style>
