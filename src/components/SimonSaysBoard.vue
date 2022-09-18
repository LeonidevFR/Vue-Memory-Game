<template>
  <div class="flex justify-center">
    <div
      v-for="(button, i) in buttons"
      @click="$emit('onButtonClick', i)"
      :class="`${button.color} ${button.class} ${
        isButtonClickable ? 'cursor-pointer' : ''
      }`"
      class="mx-4 rounded-[50px] w-[50px] h-[50px] opacity-40 hover:opacity-80 active:opacity-100"
    ></div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  buttons: Array,
  isButtonClickable: Boolean,
});
</script>
<style lang=""></style>
