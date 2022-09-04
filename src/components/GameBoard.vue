<template>
  <div class="flex flex-col items-center mt-20">
    <!-- Start Button -->
    <div
      @click="setUpGame"
      class="flex justify-center items-center rounded-lg w-[150px] h-[60px] border-[2px] border-teal-500 bg-transparent text-teal-500 text-2xl font-bold cursor-pointer"
    >
      Start
    </div>
    <div>Level : {{ level }}</div>
    <!-- Game Buttons -->
    <div class="flex flex-col items-center mt-10">
      <div class="w-full h-[150px]">
        <div
          v-if="isGameOver"
          class="flex justify-center items-center h-[100px] rounded-lg my-4 bg-red-300 text-red-500 text-2xl font-bold"
        >
          GAME OVER !
          <br />
          Restart ?
        </div>
        <div
          v-show="isGameSuccess === true"
          class="flex justify-center items-center h-[100px] rounded-lg my-4 bg-teal-300 text-slate-900 text-2xl font-bold"
        >
          Level Success !
        </div>
      </div>
      <div class="flex justify-center">
        <div
          @click="onButtonClick(i)"
          v-for="(button, i) in buttons"
          :class="`${button.color} ${button.class} ${
            isButtonClickable ? 'cursor-pointer' : ''
          }`"
          class="mx-4 rounded-[50px] w-[30px] h-[30px] opacity-40 hover:opacity-80 active:opacity-100"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const buttons = ref([
  { color: "bg-amber-500" },
  { color: "bg-teal-500" },
  { color: "bg-red-500" },
  { color: "bg-indigo-500" },
  { color: "bg-orange-500" },
  { color: "bg-cyan-500" },
  { color: "bg-fuchsia-500" },
  { color: "bg-zinc-500" },
]);

const level = ref(1);
const levelPattern = ref([]);
const userPattern = ref([]);
const isButtonClickable = ref(false);
const isGameOver = ref(false);
const isGameSuccess = ref(false);

function setUpGame() {
  levelPattern.value = [];
  userPattern.value = [];
  isGameOver.value = false;
  isGameSuccess.value = false;
  isButtonClickable.value = false;
  //level.value++;
  getPattern();
  launchGame();
}

function getPattern() {
  let patternLength = 2 + level.value;
  var pattern = new Array(patternLength).fill(1);
  pattern.forEach((element, index) => {
    pattern[index] = Math.floor(Math.random() * 8);
  });
  levelPattern.value = pattern;
  isButtonClickable.value = true;
}

function launchGame() {
  let count = 0;
  let length = levelPattern.value.length - 1;
  let index = levelPattern.value[count];
  const myInterval = setInterval(() => {
    index = levelPattern.value[count];
    buttons.value[index].class = "opacity-100";
    if (count >= length) clearInterval(myInterval);
    setTimeout(() => {
      buttons.value[index].class = "opacity-40";
    }, 500);
    count++;
  }, 1000);
}

function onButtonClick(index) {
  let levelPatternLength = levelPattern.value.length - 1;
  let userPatternLength = userPattern.value.length;

  if (isButtonClickable.value === true && !!isGameOver) {
    if (userPatternLength <= levelPatternLength) {
      if (levelPattern.value[userPatternLength] === index) {
        userPattern.value.push(index);
      } else {
        onGameOver();
      }
    }

    if (userPatternLength === levelPatternLength) {
      onLevelSuccess();
    }
  }
}

function onLevelSuccess() {
  isGameSuccess.value = true;
  level.value++;
}

function onGameOver() {
  isGameOver.value = true;
  level.value = 1;
}
</script>
<style scoped></style>
