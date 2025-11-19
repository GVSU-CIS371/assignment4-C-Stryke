<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'" />

    <ul>
      <!-- Temperature -->
      <li>
        <template v-for="temp in Temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`temp-${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>

      <!-- Base -->
      <li v-if="Base.length">
        <template v-for="base in Base" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="`base-${base.id}`"
              :value="base.id"
              v-model="currentBaseId"
            />
            {{ base.name }}
          </label>
        </template>
      </li>

      <!-- Cream -->
      <li v-if="Cream.length">
        <template v-for="cream in Cream" :key="cream.id">
          <label>
            <input
              type="radio"
              name="cream"
              :id="`cream-${cream.id}`"
              :value="cream.id"
              v-model="currentCreamId"
            />
            {{ cream.name }}
          </label>
        </template>
      </li>

      <!-- Syrup -->
      <li v-if="Syrup.length">
        <template v-for="syrup in Syrup" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`syrup-${syrup.id}`"
              :value="syrup.id"
              v-model="currentSyrupId"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>

    <!-- Actions -->
    <div class="actions">
      <ul>
        <input v-model="newName" placeholder="Name your drink" />
        <button @click="makeBeverage">Save</button>
      </ul>

      <ul class="Saved">
        <template v-for="bev in savedBeverages" :key="bev.id">
          <label>
            <input
              type="button"
              :id="`saved-${bev.id}`"
              :value="bev.name"
              @click="showBeverage(bev.id)"
            />
          </label>
          <button @click="deleteBeverage(bev.id)">X</button>
        </template>
      </ul>
    </div>
  </div>


</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import Beverage from "./components/Beverage.vue";

import { useBeverageStore } from "./stores/beverageStore";
import { storeToRefs } from "pinia";

// Computed wrappers for ID-based v-models
import {
  currentBaseId,
  currentCreamId,
  currentSyrupId,
} from "./stores/beverageComputed";


const beverageStore = useBeverageStore();

const {
  Temps,
  Base,
  Cream,
  Syrup,
  currentTemp,
  savedBeverages,
} = storeToRefs(beverageStore);


const newName = ref("");
const loading = ref(true);


onMounted(async () => {
  await beverageStore.loadIngredients();

  // Ingredients loaded → allow rendering
  loading.value = false;
});


function makeBeverage() {
  if (!newName.value.trim()) return;

  beverageStore.makeBeverage(newName.value.trim());
  newName.value = "";
}

function showBeverage(id: string) {
  beverageStore.showBeverage(id);
}

function deleteBeverage(id: string) {
  beverageStore.deleteBeverage(id);
}
</script>


<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}

.Saved {
  display: grid;
  grid-template-columns:  40% 10%;
  justify-content: center;
  gap: 0.75rem;
  padding: 0;
}

</style>