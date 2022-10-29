// produce metadata
export type Product = {
  id: string;
  name: string;
  lifespan: {
    duration: number;
    interval: "week" | "month";
  };
};

// recipe metadata
export type Recipe = {
  id: string;
  name: string;
};

// store metadata
export type Store = {
  id: string;
  name: string;
};

// shopping trip metadata
export type Trip = {
  id: string;
  name: string;
  date: Date;
};

// price information about a product and its quantity found at specific store
export type Price = {
  id: string;
  product: Product;
  store: Store;
  amount: number;
  quantity: number;
};

// product units purchased from a store at a price at a specific date
export type Supply = {
  id: string;
  price: Price;
  purchased_at: Date;
  units: number;
};

// product units at a price sought after on a specific shopping trip
export type Commodity = {
  id: string;
  trip: Trip;
  price: Price;
  units: number;
};

// the required quantity of a product for a recipe
export type Ingredient = {
  id: string;
  recipe: Recipe;
  product: Product;
  quantity: number;
};
