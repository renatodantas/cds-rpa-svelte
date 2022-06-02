import AutonomoEdit from "./pages/autonomos/AutonomoEdit.svelte";
import Autonomos from "./pages/autonomos/Autonomos.svelte";
import CargoEdit from "./pages/cargos/CargoEdit.svelte";
import Cargos from "./pages/cargos/Cargos.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";

export const routes = {
  '/': Home,
  '/autonomos': Autonomos,
  '/autonomos/:id': AutonomoEdit,
  '/cargos': Cargos,
  '/cargos/:id': CargoEdit,
  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}