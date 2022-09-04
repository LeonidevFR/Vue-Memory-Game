<template>
  <div
    class="w-full h-auto bg-slate-900 grid grid-cols-[1fr_2fr] items-center py-4"
  >
    <Home
      @click="$router.push('/')"
      class="fill-teal-400 ml-3 cursor-pointer hover:fill-teal-300"
    />
    <h1
      class="w-fit text-center bg-gradient-to-r from-teal-500 to-teal-200 bg-clip-text text-transparent text-5xl font-bold"
    >
      Vue Memory Game
    </h1>
  </div>
</template>
<script>
import Home from "./icons/Home.vue";
export default { components: { Home } };
</script>
<style scoped></style>
