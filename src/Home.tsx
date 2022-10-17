import React, { useState } from "react";
import Helmet from "react-helmet";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useTheme } from "@mui/material/styles";
import { createMakeAndWithStyles } from "tss-react";


import TopMenu from "TopMenu";

const { withStyles } = createMakeAndWithStyles({
  useTheme,
});

const AddMiddle = withStyles(Fab, {
  root: {
    position: "absolute",
    top: "calc(50% - 56px / 2)",
    left: "calc(50% - 56px / 2)",
  },
});

const AddBottom = withStyles(Fab, {
  root: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

function AddButton({ children, empty, ...rest }) {
  const Button = empty ? AddMiddle : AddBottom;
  return (
    <Button color="primary" aria-label="add" {...rest}>
      {children}
    </Button>
  );
}

function NoProductsLabelBase({ ...props }) {
  return <Box {...props}>No Products</Box>;
}

const NoProductsLabel = withStyles(NoProductsLabelBase, {
  root: {
    position: "absolute",
    top: "calc(50% - 24px / 2 + 50px)",
    left: "calc(50% - 45px)",
    minWidth: "100px",
  },
});

function ProductBase({
  product,
  onEdit,
}: {
  product: { id: string; name: string };
  onEdit: () => void;
}) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="edit" onClick={() => onEdit()}>
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemText>{product.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

const Product = ProductBase;

function Home() {
  const { products } = { products: {} };

  const procduct_ids = Object.keys(products);
  const empty = procduct_ids.length === 0;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameIsBlankError, setNameIsBlankError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<string>(null);

  async function saveProduct() {
    if (!saving) {
      setSaving(true);
      if (name.length === 0) {
        setNameIsBlankError(true);
        return;
      }
      if (currentProduct === null) {
        // await database.createProduct(name);
      } else {
        // await database.updateProduct(currentProduct, name);
        setCurrentProduct(null);
      }
      setNameIsBlankError(false);
      setName("");
      setOpen(false);
      setSaving(false);
    }
  }

  function cancel() {
    if (currentProduct !== null) setCurrentProduct(null);
    setNameIsBlankError(false);
    setName("");
    setOpen(false);
  }

  function editProduct(id: string) {
    setCurrentProduct(id);
    setName(products[id].name);
    setOpen(true);
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <TopMenu heading="Home" />
      <Dialog open={open} onClose={() => cancel()}>
        <DialogTitle>
          {currentProduct !== null ? "Edit" : "Add"} Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit this product of the existing catalogue
          </DialogContentText>
          <TextField
            error={nameIsBlankError}
            helperText={nameIsBlankError ? "Name cannot be blank" : null}
            autoFocus
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={name}
            onChange={(event) => setName(event.target.value.trim())}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancel()}>Cancel</Button>
          <Button onClick={() => saveProduct()}>Save</Button>
        </DialogActions>
      </Dialog>
      <AddButton empty={empty} onClick={() => setOpen(true)}>
        <AddIcon />
      </AddButton>
      {empty ? (
        <NoProductsLabel />
      ) : (
        <List>
          {procduct_ids.map((id) => (
            <Product
              key={id}
              product={products[id]}
              onEdit={() => editProduct(id)}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default Home;
