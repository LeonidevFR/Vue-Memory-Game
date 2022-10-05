<template>
  <div
    class="flex flex-col justify-center items-center h-[200px] rounded-lg my-4 bg-red-300 text-red-500 text-2xl font-bold"
  >
    GAME OVER !
    <div
      @click="$emit('onButtonClick')"
      class="flex justify-center items-center mt-6 rounded-lg w-[150px] h-[60px] border-[2px] border-red-500 bg-red-500 text-red-200 text-2xl font-bold cursor-pointer transition ease-in-out duration-75 hover:bg-red-700 hover:border-red-700"
    >
      Restart
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
