import {
  Commodity,
  Ingredient,
  Price,
  Product,
  Recipe,
  Store,
  Supply,
  Trip,
} from "models";

const today = new Date();
const tomorrow = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDay() + 1
);
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDay() - 1
);

const products = [
  { id: "1", name: "product 1", lifespan: { duration: 2, interval: "week" } },
  {
    id: "2",
    name: "product 2",
    lifespan: { duration: 1, interval: "month" },
  },
] as Product[];

const recipes = [
  { id: "1", name: "recipe 1" },
  { id: "2", name: "recipe 2" },
] as Recipe[];

const stores = [
  { id: "1", name: "store 1" },
  { id: "2", name: "store 2" },
] as Store[];

const prices = [
  { id: "1", store: stores[0], product: products[0], amount: 5, quantity: 10 },
  { id: "1", store: stores[1], product: products[1], amount: 3, quantity: 5 },
] as Price[];

const trips = [
  { id: "1", name: "shopping list 1", date: today },
  { id: "2", name: "shopping list 2", date: tomorrow },
] as Trip[];

const commodities = [
  { id: "1", trip: trips[0], price: prices[0] },
  { id: "2", trip: trips[0], price: prices[1] },
  { id: "3", trip: trips[1], price: prices[0] },
  { id: "4", trip: trips[1], price: prices[1] },
] as Commodity[];

const inventories = [
  { id: "1", price: prices[0], units: 2, purchased_at: yesterday },
  { id: "2", price: prices[1], units: 5, purchased_at: today },
] as Supply[];

const ingredients = [
  { id: "1", recipe: recipes[0], product: products[0], quantity: 3 },
  { id: "2", recipe: recipes[0], product: products[1], quantity: 5 },
  { id: "3", recipe: recipes[1], product: products[0], quantity: 2 },
  { id: "4", recipe: recipes[1], product: products[1], quantity: 3 },
] as Ingredient[];

export default {
  products,
  recipes,
  stores,
  trips,
  inventories,
  commodities,
  ingredients,
};
