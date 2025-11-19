import { computed } from "vue";
import { useBeverageStore } from "./beverageStore";

function getStore() {
  return useBeverageStore();
}

// Colors (null-safe)
export const Bcolor = computed(() => getStore().currentBase?.color);
export const Ccolor = computed(() => getStore().currentCream?.color);
export const Scolor = computed(() => getStore().currentSyrup?.color);

// Base ID
export const currentBaseId = computed({
  get: () => getStore().currentBase?.id ?? "",
  set: (id: string) => {
    getStore().currentBase =
      getStore().Base.find((b) => b.id === id) ?? null;
  },
});

// Cream ID
export const currentCreamId = computed({
  get: () => getStore().currentCream?.id ?? "",
  set: (id: string) => {
    getStore().currentCream =
      getStore().Cream.find((c) => c.id === id) ?? null;
  },
});

// Syrup ID
export const currentSyrupId = computed({
  get: () => getStore().currentSyrup?.id ?? "",
  set: (id: string) => {
    getStore().currentSyrup =
      getStore().Syrup.find((s) => s.id === id) ?? null;
  },
});
