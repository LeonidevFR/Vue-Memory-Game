import { createRouter, createWebHistory } from "vue-router";
import ChooseGame from "../views/ChooseGame.vue";
import GameBoard from "../components/GameBoard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: ChooseGame,
    },
    {
      path: "/memory/simon_says",
      name: "memory-simon-says",
      component: GameBoard,
    },
  ],
});

export default router;
