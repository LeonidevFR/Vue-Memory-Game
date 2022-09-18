<template>
  <div
    class="flex flex-col justify-center items-center h-[200px] rounded-lg my-4 bg-teal-300 text-slate-900 text-2xl font-bold"
  >
    Level Succeed !
    <div
      @click="$emit('onButtonClick')"
      class="flex justify-center items-center mt-6 rounded-lg w-[150px] h-[60px] border-[2px] border-teal-300 bg-slate-900 text-teal-300 text-2xl font-bold cursor-pointer transition ease-in-out duration-75 hover:bg-slate-800"
    >
      Continue
    </div>
  </div>
</template>
<script></script>
<style lang=""></style>
