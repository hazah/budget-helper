export default [
  // lookup objects
  { singular: "product", plural: "products" },
  { singular: "store", plural: "stores" },
  { singular: "trip", plural: "trips" },
  { singular: "recipe", plural: "recipes" },

  // activity data records
  {
    singular: "price",
    plural: "prices",
    relations: {
      product: { belongsTo: "product" },
      store: { belongsTo: "store" },
    },
  },
  {
    singular: "supply",
    plural: "supplies",
    relations: {
      price: { belongsTo: "price" },
    },
  },
  {
    singular: "commodity",
    plural: "commodities",
    relations: {
      trip: { belongsTo: "trip" },
      price: { belongsTo: "price" },
    },
  },
  {
    singular: "ingredient",
    plural: "ingredients",
    relations: {
      recipe: { belongsTo: "recipe" },
      product: { belongsTo: "product" },
    },
  },
];
