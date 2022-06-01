import AutonomoEdit from "./pages/AutonomoEdit.svelte";
import Autonomos from "./pages/Autonomos.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";

export const routes = {
  '/': Home,
  '/autonomos': Autonomos,
  '/autonomos/:id': AutonomoEdit,
  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}