import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ElementTabletAuto } from "./screens/ElementTabletAuto/ElementTabletAuto";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ElementTabletAuto />
  </StrictMode>,
);
