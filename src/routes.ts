import AutonomoEdit from "./pages/autonomos/AutonomoEdit.svelte";
import Autonomos from "./pages/autonomos/Autonomos.svelte";
import ContratoEdit from "./pages/autonomos/contratos/ContratoEdit.svelte";
import Contratos from "./pages/autonomos/contratos/Contratos.svelte";
import DiariaEdit from "./pages/autonomos/diarias/DiariaEdit.svelte";
import Diarias from "./pages/autonomos/diarias/Diarias.svelte";
import PagamentoAutonomoEdit from "./pages/autonomos/pagamentos/PagamentoAutonomoEdit.svelte";
import PagamentosAutonomo from "./pages/autonomos/pagamentos/PagamentosAutonomo.svelte";
import CargoEdit from "./pages/cargos/CargoEdit.svelte";
import Cargos from "./pages/cargos/Cargos.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import PagamentoEdit from "./pages/pagamentos/PagamentoEdit.svelte";
import Pagamentos from "./pages/pagamentos/Pagamentos.svelte";

export const routes = {
  '/': Home,
  '/autonomos': Autonomos,
  '/autonomos/:id': AutonomoEdit,
  '/autonomos/:id/contratos': Contratos,
  '/autonomos/:id/contratos/:id_contrato': ContratoEdit,
  '/autonomos/:id/diarias': Diarias,
  '/autonomos/:id/diarias/:id_diaria': DiariaEdit,
  '/autonomos/:id/pagamentos': PagamentosAutonomo,
  '/autonomos/:id/pagamentos/:id_pagamento': PagamentoAutonomoEdit,
  '/cargos': Cargos,
  '/cargos/:id': CargoEdit,
  '/pagamentos': Pagamentos,
  '/pagamentos/novo': PagamentoEdit,
  // Catch-all
  // This is optional, but if present it must be the last
  '*': NotFound,
}