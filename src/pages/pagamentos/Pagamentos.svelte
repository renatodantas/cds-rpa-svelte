<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import type { Pagamento } from '../../models/pagamento';
  import { pagamentosService } from '../../services/pagamentos.service';
  import { formatDecimal } from '../../utils/formatters';

  let itens: Pagamento[] = [];

  onMount(() => listar());

  async function listar() {
    itens = await pagamentosService.list();
  }

  async function remover(item: Pagamento) {
    if (await pagamentosService.remover(item)) {
      listar();
    }
  }
</script>

<div class="container">
  <Breadcrumb>Pagamentos</Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Data</th>
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
      <!-- {#each itens as item} -->
      <tr>
        <td>
          13/06/2022
          <button class="btn-expandir">
            <i class="bi bi-caret-right-fill" />
          </button>
        </td>
        <td colspan="4" class="text-end">
          {formatDecimal(230) || '-'}
        </td>
        <td class="text-end">
          <a class="btn btn-sm btn-link" href={`#/pagamentos/${'100'}`}>
            <i class="bi-pencil" title="Editar pagamento" />
          </a>
          <button class="btn btn-sm btn-link" on:click|preventDefault={() => remover(null)}>
            <i class="bi-trash3" title="Remover pagamento" />
          </button>
        </td>
      </tr>

      <!-- Linha expandida -->
      <tr class="table-primary">
        <td class="ps-4">Fulano</td>
        <td class="text-end">{formatDecimal(100) || '-'}</td>
        <td class="text-end">{formatDecimal(0.15) || '-'}</td>
        <td class="text-end">{formatDecimal(undefined) || '-'}</td>
        <td class="text-end">{formatDecimal(115)}</td>
        <td />
      </tr>
      <tr class="table-primary">
        <td class="ps-4">Beltrano</td>
        <td class="text-end">{formatDecimal(100) || '-'}</td>
        <td class="text-end">{formatDecimal(0.15) || '-'}</td>
        <td class="text-end">{formatDecimal(undefined) || '-'}</td>
        <td class="text-end">{formatDecimal(115)}</td>
        <td />
      </tr>
      <!-- {/each} -->
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
