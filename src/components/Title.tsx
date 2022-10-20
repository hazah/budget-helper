import { useMatches, useRoutes } from "react-router-dom";

const titles = {
  shopping_lists: "Shopping Lists",
  recipes: "Recipes",
  available_products: "Available Products",
  products: "Products",
  stores: "Stores",
};

export default function Title() {
  const matches = useMatches();
  const name = (matches[matches.length - 1].data as any).name;
  const id = matches[matches.length - 1].id;

  return useRoutes([
    {
      path: "/",
      children: [
        { index: true, element: titles[id] },
        {
          path: ":shopping_list_id",
          children: [
            { index: true, element: name },
            { path: "edit", element: `Editing ${name}` },
          ],
        },
      ],
    },
    {
      path: "/recipes",
      children: [
        { index: true, element: titles[id] },
        {
          path: ":recepe_id",
          children: [
            { index: true, element: name },
            { path: "edit", element: `Editing ${name}` },
          ],
        },
      ],
    },
    {
      path: "/available_products",
      children: [{ index: true, element: titles[id] }],
    },
    {
      path: "/products",
      children: [
        { index: true, element: titles[id] },
        {
          path: ":product_id",
          children: [
            { index: true, element: name },
            { path: "edit", element: `Editing ${name}` },
          ],
        },
      ],
    },
    {
      path: "/stores",
      children: [
        { index: true, element: titles[id] },
        {
          path: ":store_id",
          children: [
            { index: true, element: name },
            { path: "edit", element: `Editing ${name}` },
          ],
        },
      ],
    },
  ]);
}
