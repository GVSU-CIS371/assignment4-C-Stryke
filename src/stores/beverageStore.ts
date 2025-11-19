import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";


export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    Temps: tempretures,
    currentTemp: tempretures[0],


    Base: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,


    Cream: [] as CreamerType[],
    currentCream: null as CreamerType | null,


    Syrup: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,




    savedBeverages: [] as {
      id: string;
      name: string;
      temp: string;
      baseId: string;
      creamId: string;
      syrupId: string;
    }[],
  }),


  actions: {


    async loadIngredients() {
      // Load Bases

  console.log("Loading ingredients…");

  const baseSnap = await getDocs(collection(db, "Bases"));
  console.log("Base docs:", baseSnap.docs.length);

  const creamSnap = await getDocs(collection(db, "Creamers"));
  console.log("Cream docs:", creamSnap.docs.length);

  const syrupSnap = await getDocs(collection(db, "Syrups"));
  console.log("Syrup docs:", syrupSnap.docs.length);



//const baseSnap = await getDocs(collection(db, "Bases"));
  this.Base = 
  baseSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BaseBeverageType[];

//const creamSnap = await getDocs(collection(db, "Creamers"));
  this.Cream = 
  creamSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CreamerType[];

//const syrupSnap = await getDocs(collection(db, "Syrups"));
  this.Syrup = 
  syrupSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SyrupType[];


      // Set defaults (first items)
  if (this.Base.length > 0) this.currentBase = this.Base[0];
  if (this.Cream.length > 0) this.currentCream = this.Cream[0];
  if (this.Syrup.length > 0) this.currentSyrup = this.Syrup[0];
    },

async loadBeverages() {
  const bevSnap = await getDocs(collection(db, "Beverages"));
  
  this.savedBeverages = bevSnap.docs.map(d => ({
    id: d.id,
    ...d.data(),
  })) as any;
}, 

async makeBeverage(name: string) {
  const id = crypto.randomUUID(); // safe unique ID

  const newBeverage = {
    name,
    temp: this.currentTemp,
    baseId: this.currentBase!.id,
    creamId: this.currentCream!.id,
    syrupId: this.currentSyrup!.id,
  };

  // Save to Firestore
  await setDoc(doc(db, "Beverages", id), newBeverage);

  // Update local state
  this.savedBeverages.push({ id, ...newBeverage });
},


    showBeverage(id: string) {
      const bev = this.savedBeverages.find((b) => b.id === id);
      if (!bev) return;


      this.currentTemp = bev.temp;
      this.currentBase = this.Base.find((b) => b.id === bev.baseId)!;
      this.currentCream = this.Cream.find((c) => c.id === bev.creamId)!;
      this.currentSyrup = this.Syrup.find((s) => s.id === bev.syrupId)!;
    },


async deleteBeverage(id: string) {
  // Remove from Firestore
  await deleteDoc(doc(db, "Beverages", id));

  // Remove locally
  this.savedBeverages = this.savedBeverages.filter(b => b.id !== id);
}

  },


  persist: false, // still persists via pinia-plugin-persistedstate
});
