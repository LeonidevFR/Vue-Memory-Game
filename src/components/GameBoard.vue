<template>
  <TheHeader></TheHeader>
  <div class="flex flex-col items-center mt-10">
    <div class="text-3xl font-bold text-purple-300">Level : {{ level }}</div>
    <div class="text-3xl font-bold text-purple-300">
      Best Score : {{ userBestScore }}
    </div>
    <!-- Start Button -->
    <div
      v-if="level === 1 && isGameOver === false"
      @click="setUpGame"
      class="flex justify-center items-center rounded-lg w-[150px] h-[60px] border-[2px] border-teal-500 bg-transparent text-teal-500 text-2xl font-bold cursor-pointer transition ease-in-out duration-75 hover:bg-teal-500 hover:text-slate-900"
    >
      {{ computedButtonTitle }}
    </div>
    <div class="flex flex-col items-center mt-10">
      <!-- Game Buttons -->
      <div class="flex justify-center">
        <div
          @click="onButtonClick(i)"
          v-for="(button, i) in buttons"
          :class="`${button.color} ${button.class} ${
            isButtonClickable ? 'cursor-pointer' : ''
          }`"
          class="mx-4 rounded-[50px] w-[50px] h-[50px] opacity-40 hover:opacity-80 active:opacity-100"
        ></div>
      </div>
      <!-- Game Status -->
      <div class="w-full h-[250px] mt-5">
        <GameStatusOver v-if="isGameOver === true" @onButtonClick="setUpGame" />
        <GameStatusSuccess
          v-if="isGameSuccess === true"
          @onButtonClick="setUpGame"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import GameStatusSuccess from "./GameStatusSuccess.vue";
import GameStatusOver from "./GameStatusOver.vue";
import TheHeader from "./TheHeader.vue";

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
const userBestScore = ref(0);
const levelPattern = ref([]);
const userPattern = ref([]);
const isButtonClickable = ref(false);
const isGameOver = ref(false);
const isGameSuccess = ref(false);
const computedButtonTitle = computed(() => {
  if (level.value > 1) {
    return "Continue";
  } else {
    return "Start";
  }
});

onMounted(() => {
  setBestScore();
});

function setUpGame() {
  levelPattern.value = [];
  userPattern.value = [];
  isGameOver.value = false;
  isGameSuccess.value = false;
  isButtonClickable.value = false;
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
}

function launchGame() {
  let count = 0;
  let length = levelPattern.value.length - 1;
  let index = levelPattern.value[count];
  const myInterval = setInterval(() => {
    index = levelPattern.value[count];
    buttons.value[index].class = "opacity-100";
    if (count >= length) {
      clearInterval(myInterval);
      isButtonClickable.value = true;
    }
    setTimeout(() => {
      buttons.value[index].class = "opacity-40";
    }, 500);
    count++;
  }, 1000);
}

function setBestScore() {
  let currentScore = level.value;
  let bestScore = localStorage.getItem("bestScore");
  userBestScore.value = localStorage.getItem("bestScore");

  if (!bestScore) {
    localStorage.setItem("bestScore", currentScore);
    userBestScore.value = currentScore;
  }

  if (currentScore > bestScore) {
    localStorage.setItem("bestScore", currentScore);
    userBestScore.value = currentScore;
  }
}

function onButtonClick(index) {
  let levelPatternLength = levelPattern.value.length - 1;
  let userPatternLength = userPattern.value.length;

  if (!isGameOver.value === true && !isGameSuccess.value === true) {
    if (isButtonClickable.value === true && !!isGameOver) {
      if (userPatternLength <= levelPatternLength) {
        if (levelPattern.value[userPatternLength] === index) {
          userPattern.value.push(index);
        } else {
          onGameOver();
          return;
        }
      }

      if (userPatternLength === levelPatternLength) {
        onLevelSuccess();
      }
    }
  }
}

function onLevelSuccess() {
  isGameSuccess.value = true;
  level.value++;
  setBestScore();
}

function onGameOver() {
  isGameOver.value = true;
  level.value = 1;
}
</script>
<style scoped></style>
