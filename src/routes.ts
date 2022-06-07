import AutonomoEdit from "./pages/autonomos/AutonomoEdit.svelte";
import Autonomos from "./pages/autonomos/Autonomos.svelte";
import ContratoEdit from "./pages/autonomos/contratos/ContratoEdit.svelte";
import Contratos from "./pages/autonomos/contratos/Contratos.svelte";
import DiariaEdit from "./pages/autonomos/diarias/DiariaEdit.svelte";
import Diarias from "./pages/autonomos/diarias/Diarias.svelte";
import PagamentoEdit from "./pages/autonomos/pagamentos/PagamentoEdit.svelte";
import Pagamentos from "./pages/autonomos/pagamentos/Pagamentos.svelte";
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
  '/autonomos/:id/diarias': Diarias,
  '/autonomos/:id/diarias/:id_diaria': DiariaEdit,
  '/autonomos/:id/pagamentos': Pagamentos,
  '/autonomos/:id/pagamentos/:id_pagamento': PagamentoEdit,
  '/cargos': Cargos,
  '/cargos/:id': CargoEdit,
  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}