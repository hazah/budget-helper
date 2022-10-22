export default [
  { singular: "product", plural: "products" },
  { singular: "store", plural: "stores" },
  {
    singular: "price",
    plural: "prices",
    relations: {
      product: { belongsTo: "product" },
      store: { belongsTo: "store" },
    },
  },
  { singular: "trip", plural: "trips" },
  { singular: "recipe", plural: "recipes" },
  {
    singular: "supply",
    plural: "supplies",
    relations: {
      price: { belongsTo: "price" },
      store: { belongsTo: "store" },
    },
  },
  {
    singular: "shopping_product",
    plural: "shopping_products",
    relations: {
      shopping_list: { belongsTo: "trip" },
      price: { belongsTo: "price" },
    },
  },
  {
    singular: "recipe_product",
    plural: "recipe_products",
    relations: {
      recipe: { belongsTo: "recipe" },
      product: { belongsTo: "product" },
    },
  },
];
