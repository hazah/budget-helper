import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isClient } from "utils";

export default function Modal({ children }) {
  const [element] = useState(
    isClient() ? document.createElement("div") : null
  );

  useEffect(() => {
    const modal = document.getElementById("modal")
    modal.appendChild(element);
    return () => {
      modal.removeChild(element);
    }
  });

  return isClient() && element ? createPortal(children, element) : null;
}
