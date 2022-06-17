<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import CaretIcon from '../../lib/CaretIcon.svelte';
  import type { Pagamento, PagamentoDiaria } from '../../models/pagamento';
  import { pagamentosService } from '../../services/pagamentos.service';
  import { formatDecimal } from '../../utils/formatters';

  let itens: Pagamento[] = [];
  let itensFechados: boolean[] = [];

  onMount(() => listar());

  const listar = async () => {
    itens = await pagamentosService.list();
  };

  const remover = async (item: Pagamento) => {
    if (await pagamentosService.remover(item)) {
      listar();
    }
  };

  const expandir = (index: number) => {
    itensFechados[index] = !itensFechados[index];
  };

  const getTotal = ({
    pagouValorVT,
    pagouValorVR,
    pagouValorDiaria,
    diaria: { valorVT, valorVR, valorDiaria },
  }: PagamentoDiaria) =>
    (pagouValorVT ? valorVT : 0) + (pagouValorVR ? valorVR : 0) + (pagouValorDiaria ? valorDiaria : 0);
</script>

<div class="container">
  <Breadcrumb>Pagamentos</Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Data do Pagto.</th>
        <th>Data da Diária</th>
        <th>VT (R$)</th>
        <th>VR (R$)</th>
        <th>Diária (R$)</th>
        <th>Total (R$)</th>
        <th style="width: 6rem" class="text-end">
          <a class="btn btn-primary btn-sm" href={`#/pagamentos/novo`}>
            <i class="bi-plus" /> Novo
          </a>
        </th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each itens as item, index}
        <tr>
          <td>
            {item.data.toLocaleString()}
            <button class="btn-expandir" on:click={() => expandir(index)}>
              <CaretIcon isClosed={itensFechados[index]} />
            </button>
          </td>
          <td colspan="5" class="text-end">
            {formatDecimal(item.valor) || '-'}
          </td>
          <td class="text-end">
            <!-- 
          <a class="btn btn-sm btn-link" href={`#/pagamentos/${'100'}`}>
            <i class="bi-pencil" title="Editar pagamento" />
          </a>
          -->
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => remover(item)}>
              <i class="bi-trash3" title="Remover pagamento" />
            </button>
          </td>
        </tr>

        <!-- Linha expandida -->
        {#each item.diarias as pagtoDiaria}
          <tr class="table-warning" class:d-none={itensFechados[index]}>
            <td class="ps-4">
              {pagtoDiaria.diaria.contrato.autonomo.nome}
            </td>
            <td>
              {pagtoDiaria.diaria.data.toLocaleString()}
            </td>
            <td class="text-end">
              {pagtoDiaria.pagouValorVT ? formatDecimal(pagtoDiaria.diaria.valorVT) : '-'}
            </td>
            <td class="text-end">
              {pagtoDiaria.pagouValorVR ? formatDecimal(pagtoDiaria.diaria.valorVR) : '-'}
            </td>
            <td class="text-end">
              {pagtoDiaria.pagouValorDiaria ? formatDecimal(pagtoDiaria.diaria.valorDiaria) : '-'}
            </td>
            <td class="text-end">{formatDecimal(getTotal(pagtoDiaria))}</td>
            <td />
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .btn-expandir {
    background-color: transparent;
    border: 0;
    padding: 0.2rem;
  }
  tr.table-primary {
    font-size: 0.8rem;
  }
</style>
