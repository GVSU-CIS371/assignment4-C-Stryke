<template>
  <div class="baseBeverage" :style="{'--Bcolor': Bcolor}"></div>
</template>

<script setup lang="ts">
import { Bcolor } from '../stores/beverageComputed';
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--Bcolor);
  bottom: 0;
  animation: pour-tea 2s;
  z-index: 300;
  /* // border-radius: 0.05em 0.05em 2.2em 2.2em; */
}
</style>