<script lang="ts">
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Contrato } from '../../../models/contrato';
  import { autonomoService } from '../../../services/autonomos.service';
  import { contratoService } from '../../../services/contratos.service';
  import { formatDecimal } from '../../../utils/formatters';

  // Path params
  export let params: Record<string, string>;
  let itens: Contrato[] = [];
  let autonomo: Autonomo;

  $: autonomoId = params.id;

  onMount(() => listar());

  const listar = async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    itens = await contratoService.list(autonomoId);
  };

  const isContratoVencido = (data: DateTime): boolean => {
    return data.startOf('day') < DateTime.now().startOf('day');
  };

  const encerrar = async (item: Contrato) => {
    await contratoService.encerrar(item);
    await listar();
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Autônomos', link: '#/autonomos' }]}>
    Contratos de {autonomo?.nome}
  </Breadcrumb>

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
        <tr class:table-danger={isContratoVencido(item.vigenciaFim)}>
          <td>{item.vigenciaInicio.toLocaleString()}</td>
          <td>{item.vigenciaFim.toLocaleString()}</td>
          <td class="text-end">{formatDecimal(item.valorVT) || '-'}</td>
          <td class="text-end">{formatDecimal(item.valorVR) || '-'}</td>
          <td class="text-end">{formatDecimal(item.valorDiaria) || '-'}</td>
          <td>{item.cargo.descricao}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/autonomos/${autonomoId}/contratos/${item.id}`} use:link>
              <i class="bi-pencil" title="Editar contrato" />
            </a>
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => encerrar(item)}>
              <i class="bi-shield-slash" title="Encerrar contrato" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
