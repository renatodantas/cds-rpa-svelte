<script lang="ts">
  import { onMount } from 'svelte';
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
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Autônomos', link: '#/autonomos' }]}>
    Pagamentos de {autonomo?.nome}
  </Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Início</th>
        <th>Fim</th>
        <th>Cargo</th>
        <th>VT (R$)</th>
        <th>VR (R$)</th>
        <th>Diária (R$)</th>
        <!-- <th style="width: 6rem" class="text-end">
          <a class="btn btn-primary btn-sm" href={`/autonomos/${autonomoId}/pagamentos/novo`} use:link>
            <i class="bi-plus" /> Novo
          </a>
        </th> -->
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each itens as item}
        <tr>
          <td>{item.vigenciaInicio.toLocaleString()}</td>
          <td>{item.vigenciaFim.toLocaleString()}</td>
          <td>{item.cargo.descricao}</td>
          <td>{formatDecimal(item.valorVT) || '-'}</td>
          <td>{formatDecimal(item.valorVR) || '-'}</td>
          <td>{formatDecimal(item.valorDiaria) || '-'}</td>
          <!-- <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/autonomos/${autonomoId}/pagamentos/${item.id}`} use:link>
              <i class="bi-pencil" title="Editar contrato" />
            </a>
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => encerrar(item)}>
              <i class="bi-shield-slash" title="Encerrar contrato" />
            </button>
          </td> -->
        </tr>
      {/each}
    </tbody>
  </table>
</div>
