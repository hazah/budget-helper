import React, { forwardRef } from "react";
import { useLoaderData } from "react-router-dom";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";

type ListItemLinkProps = {
  icon?: React.ReactElement;
  primary: string;
  to: string;
};

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const Container = styled(Box)({
  flexGrow: 1,
});

export default function AvailableProducts() {
  const availableProducts = useLoaderData() as any[];

  return (
    <Paper elevation={0}>
      <nav>
        <List>
          {availableProducts.map(availableProduct => (
            <ListItemLink
              key={availableProduct.name}
              to={`/products/${availableProduct.id}`}
              primary={`${availableProduct.name} - ${availableProduct.units}`}
            />
          ))}
        </List>
      </nav>
    </Paper>
  );
}
