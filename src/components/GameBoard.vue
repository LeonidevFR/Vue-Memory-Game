<template>
  <div class="flex flex-col items-center mt-20">
    <div
      @click="setUpGame"
      class="flex justify-center items-center rounded-lg w-[150px] h-[60px] border-[2px] border-teal-500 bg-transparent text-teal-500 text-2xl font-bold cursor-pointer"
    >
      Start
    </div>
    <div>Level : {{ level }}</div>
    <div class="flex justify-center mt-40">
      <div
        v-for="(button, i) in buttons"
        :class="`${button.color} ${button.class}`"
        class="mx-4 cursor-pointer rounded-[50px] w-[30px] h-[30px] opacity-40 hover:opacity-80 active:opacity-100"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const buttons = ref([
  { color: "bg-amber-500", isActive: false },
  { color: "bg-teal-500", isActive: false },
  { color: "bg-red-500", isActive: false },
  { color: "bg-indigo-500", isActive: false },
  { color: "bg-orange-500", isActive: false },
  { color: "bg-cyan-500", isActive: false },
  { color: "bg-fuchsia-500", isActive: false },
  { color: "bg-zinc-500", isActive: false },
]);

const level = ref(1);
const roundPattern = ref([]);

function setUpGame() {
  console.log("Henlo");
  level.value++;
  getPattern();
  launchGame();
}

function getPattern() {
  let patternLength = 3;
  var pattern = new Array(patternLength).fill(1);
  pattern.forEach((element, index) => {
    pattern[index] = Math.floor(Math.random() * 8);
  });
  roundPattern.value = pattern;
}

function launchGame() {
  let count = 0;
  let length = roundPattern.value.length - 1;
  let index = roundPattern.value[count];
  const myInterval = setInterval(() => {
    index = roundPattern.value[count];
    buttons.value[index].class = "opacity-100";
    if (count >= length) clearInterval(myInterval);
    setTimeout(() => {
      buttons.value[index].class = "opacity-40";
    }, 500);
    console.log(index);
    count++;
  }, 1000);
}
</script>
<style scoped></style>
