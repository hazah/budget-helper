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
  { singular: "shopping_list", plural: "shopping_lists" },
  { singular: "recipe", plural: "recipes" },
  {
    singular: "available_product",
    plural: "available_products",
    relations: {
      price: { belongsTo: "price" },
      store: { belongsTo: "store" },
    },
  },
  {
    singular: "shopping_product",
    plural: "shopping_products",
    relations: {
      shopping_list: { belongsTo: "shopping_list" },
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
