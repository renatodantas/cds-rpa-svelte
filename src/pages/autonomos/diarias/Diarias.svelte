<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Diaria } from '../../../models/diaria';
  import { autonomoService } from '../../../services/autonomos.service';
  import { diariasService } from '../../../services/diarias.service';
  import { formatDecimal } from '../../../utils/formatters';

  // Path params
  export let params: Record<string, string>;
  let itens: Diaria[] = [];
  let autonomo: Autonomo;

  $: autonomoId = params.id;

  onMount(async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    await listar();
  });

  const listar = async () => {
    itens = await diariasService.list(autonomoId);
  };

  const remover = async (item: Diaria) => {
    if (await diariasService.remover(item)) {
      listar();
    }
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Autônomos', link: '#/autonomos' }]}>
    Diárias de {autonomo?.nome}
  </Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Data</th>
        <th>VT (R$)</th>
        <th>VR (R$)</th>
        <th>Diária (R$)</th>
        <th style="width: 13rem" class="text-end">
          <a class="btn btn-primary btn-sm" href={`#/autonomos/${autonomoId}/diarias/novo`}>
            <i class="bi-plus" /> Nova
          </a>
        </th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each itens as item}
        <tr>
          <td>{item.data.toLocaleString()}</td>
          <td class="text-end">{formatDecimal(item.valorVT) || '-'}</td>
          <td class="text-end">{formatDecimal(item.valorVR) || '-'}</td>
          <td class="text-end">{formatDecimal(item.valorDiaria) || '-'}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`#/autonomos/${item.id}`}>
              <i class="bi-pencil" title="Editar autônomo" />
            </a>
            <a class="btn btn-sm btn-link" href={`#/autonomos/${item.id}/contratos`}>
              <i class="bi-shield-check" title="Contratos" />
            </a>
            <a class="btn btn-sm btn-link" href={`/#autonomos/${item.id}/diarias`}>
              <i class="bi-calendar-check" title="Diárias" />
            </a>
            <a class="btn btn-sm btn-link" href={`/autonomos/${item.id}/pagamentos`}>
              <i class="bi-cash-stack" title="Pagamentos" />
            </a>
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => remover(item)}>
              <i class="bi-trash3" title="Excluir autônomo" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
