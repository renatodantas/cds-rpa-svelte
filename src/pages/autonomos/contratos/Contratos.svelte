<script lang="ts">
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Contrato } from '../../../models/contrato';
  import { autonomoService } from '../../../services/autonomos.service';
  import { contratoService } from '../../../services/contratos.service';
  import { formatDate, formatDecimal } from '../../../utils/formatters';

  // Path params
  export let params: Record<string, string>;
  let itens: Contrato[] = [];
  let autonomo: Autonomo;

  $: autonomoId = params.id;

  onMount(() => listar());

  async function listar() {
    autonomo = await autonomoService.getByID(autonomoId);
    itens = await contratoService.list(autonomoId);
  }

  async function encerrar(item: Contrato) {
    await contratoService.encerrar(item);
    listar();
  }
</script>

<div class="container">
  <h1 class="mb-4">Contratos de {autonomo?.nome}</h1>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Início</th>
        <th>Fim</th>
        <th>VT (R$)</th>
        <th>VR (R$)</th>
        <th>Diária (R$)</th>
        <th>Cargo</th>
        <th style="width: 6rem" class="text-end">
          <a class="btn btn-primary btn-sm" href={`/autonomos/${autonomoId}/contratos/novo`} use:link>
            <i class="bi-plus" /> Novo
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each itens as item}
        <tr>
          <td>{formatDate(item.vigenciaInicio)}</td>
          <td>{formatDate(item.vigenciaFim)}</td>
          <td>{formatDecimal(item.valorVT)}</td>
          <td>{formatDecimal(item.valorVR)}</td>
          <td>{formatDecimal(item.valorDiaria)}</td>
          <td>{item.cargo.descricao}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/autonomos/${autonomoId}/contratos/${item.id}`} use:link>
              <i class="bi-pencil" title="Editar contrato" />
            </a>
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => encerrar(item)}>
              <i class="bi-trash3" title="Encerrar contrato" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
