<template>
  <div class="flex flex-col justify-between items-center w-full h-[200px]">
    <span class="flex text-3xl">
      {
      <h1 :class="numbersClass">
        {{ levelPattern ? levelPattern.join("") : "" }}
      </h1>
      }
    </span>
    <form
      @submit.prevent="
        $emit('update:userNumbersPattern', modelValue);
        $emit('onInputValidation');
        modelValue = undefined;
      "
      class="flex flex-col items-center"
    >
      <span class="text-slate-200 text-lg font-bold">
        The right number is :
        <input
          v-model="modelValue"
          type="text"
          class="text-slate-200 text-lg font-bold mb-8 bg-transparent border-b-2 focus:outline-none"
        />
      </span>
      <input type="submit" class="btn-primary" value="Confirm" />
    </form>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  numbersClass: String,
  userNumbersPattern: String,
  levelPattern: Array,
});

const modelValue = ref(props.userNumbersPattern);
</script>
<style lang=""></style>
