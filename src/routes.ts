import AutonomoEdit from "./pages/autonomos/AutonomoEdit.svelte";
import Autonomos from "./pages/autonomos/Autonomos.svelte";
import ContratoEdit from "./pages/autonomos/contratos/ContratoEdit.svelte";
import Contratos from "./pages/autonomos/contratos/Contratos.svelte";
import CargoEdit from "./pages/cargos/CargoEdit.svelte";
import Cargos from "./pages/cargos/Cargos.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";

export const routes = {
  '/': Home,
  '/autonomos': Autonomos,
  '/autonomos/:id': AutonomoEdit,
  '/autonomos/:id/contratos': Contratos,
  '/autonomos/:id/contratos/:id_contrato': ContratoEdit,
  '/cargos': Cargos,
  '/cargos/:id': CargoEdit,
  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}