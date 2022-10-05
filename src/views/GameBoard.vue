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
      class="btn-primary w-[150px]"
    >
      Start
    </div>
    <div class="flex flex-col items-center mt-10">
      <!-- Game Board -->
      <SimonSaysBoard
        v-if="typeOfGame === 'memory-simon-says'"
        :buttons="buttons"
        :is-button-clickable="isButtonClickable"
        @onButtonClick="onButtonClick($event)"
      />
      <div class="w-[800px]">
        <NumbersGameBoard
          v-if="typeOfGame === 'memory-numbers'"
          v-model:userNumbersPattern="userNumbersPattern"
          :numbers-class="numbersClass"
          :level-pattern="levelPattern"
          @onInputValidation="onInputValidation"
        />
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import GameStatusSuccess from "../components/GameStatusSuccess.vue";
import GameStatusOver from "../components/GameStatusOver.vue";
import TheHeader from "../components/TheHeader.vue";
import SimonSaysBoard from "../components/SimonSaysBoard.vue";
import NumbersGameBoard from "../components/NumbersGameBoard.vue";

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
const route = useRoute();
const typeOfGame = ref(undefined);
const userBestScore = ref(0);
const levelPattern = ref([]);
const userPattern = ref([]);
const userNumbersPattern = ref();
const numbersClass = ref(undefined);
const isButtonClickable = ref(false);
const isGameOver = ref(false);
const isGameSuccess = ref(false);

onMounted(() => {
  typeOfGame.value = route.name;
  setBestScore();
});

function setUpGame() {
  levelPattern.value = [];
  userPattern.value = [];
  isGameOver.value = false;
  isGameSuccess.value = false;
  isButtonClickable.value = false;
  getPattern();

  if (typeOfGame.value === "memory-simon-says") {
    launchSimonSaysGame();
  } else if (typeOfGame.value === "memory-numbers") {
    lauchNumbersGame();
  }
}

function getPattern() {
  let patternLength = 2 + level.value;
  var pattern = new Array(patternLength).fill(1);
  pattern.forEach((element, index) => {
    pattern[index] = Math.floor(Math.random() * 8);
  });
  levelPattern.value = pattern;
}

function setBestScore() {
  let currentScore = level.value;
  let storageName = `${typeOfGame.value}-best-score`;
  let bestScore = localStorage.getItem(storageName);
  userBestScore.value = localStorage.getItem(storageName);

  if (!bestScore) {
    localStorage.setItem(storageName, currentScore);
    userBestScore.value = currentScore;
  }

  if (currentScore > bestScore) {
    localStorage.setItem(storageName, currentScore);
    userBestScore.value = currentScore;
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

// Simon says game functions

function launchSimonSaysGame() {
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

// Numbers game functions

function lauchNumbersGame() {
  numbersClass.value = "block";
  let length = levelPattern.value.length - 1;
  setTimeout(() => {
    numbersClass.value = "hidden";
  }, 250 * length);
}

function onInputValidation() {
  if (isGameOver.value === false && isGameSuccess.value === false) {
    if (levelPattern.value.join("") === userNumbersPattern.value) {
      userNumbersPattern.value = undefined;
      onLevelSuccess();
    } else {
      userNumbersPattern.value = undefined;
      onGameOver();
    }
  }
}
</script>
<style scoped></style>
