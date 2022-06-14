<script lang="ts">
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Contrato } from '../../../models/contrato';
  import { DIARIA_DEFAULT_VALUE, type Diaria } from '../../../models/diaria';
  import { autonomoService } from '../../../services/autonomos.service';
  import { contratoService } from '../../../services/contratos.service';
  import { diariasService } from '../../../services/diarias.service';
  import { formatDecimal } from '../../../utils/formatters';
  import { handleCurencyInput } from '../../../utils/input-masks';

  // Path params
  export let params: Record<string, string>;
  let item: Diaria = { ...DIARIA_DEFAULT_VALUE };

  let autonomo: Autonomo;
  let contratos: Contrato[] = [];
  let dataInicio: string;
  let dataFim: string;
  let valorVT: string;
  let valorVR: string;
  let valorDiaria: string;

  $: autonomoId = params.id;
  $: diariaId = params.id_diaria;
  $: isNovaDiaria = diariaId === 'novo';

  onMount(async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    contratos = await contratoService.list(autonomoId);
    if (diariaId !== 'novo') {
      item = await diariasService.getByID(diariaId);
    } else if (contratos.length === 1) {
      item.contrato = contratos[0];
    }
    valorVT = formatDecimal(item.valorVT) || '';
    valorVR = formatDecimal(item.valorVR) || '';
    valorDiaria = formatDecimal(item.valorDiaria) || '';
    dataInicio = item.data.toISODate();
  });

  const voltar = () => pop();

  const salvar = async () => {
    try {
      const objDataInicio = DateTime.fromISO(dataInicio);
      const objDataFim = DateTime.fromISO(dataFim);
      await diariasService.salvar(item, objDataInicio, objDataFim);
      voltar();
    } catch (err) {
      alert(err);
    }
  };
</script>

<div class="container">
  <Breadcrumb
    items={[
      { label: 'Autônomos', link: '#/autonomos' },
      { label: `Diárias de ${autonomo?.nome}`, link: `#/autonomos/${autonomoId}/diarias` },
    ]}
  >
    Editar Diária
  </Breadcrumb>

  <form class="row g-2 w-50 mx-auto" on:submit|preventDefault={salvar}>
    <div class="col-md">
      <div class="form-floating">
        <select class="form-select" id="contrato" aria-label="contrato" required bind:value={item.contrato}>
          {#each contratos as contrato}
            <option value={contrato}>
              Vigência: {contrato.vigenciaInicio.toLocaleString()} a {contrato.vigenciaFim.toLocaleString()}
            </option>
          {/each}
          {#if contratos.length === 0}
            <option value="">Não existem contratos ativos ou cadastrados</option>
          {/if}
        </select>
        <label for="contrato">Contrato</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <div class="form-floating">
        <input
          type="text"
          id="valorVT"
          class="form-control"
          placeholder="valorVT"
          value={valorVT}
          on:keyup={(e) => handleCurencyInput(e, item)}
          on:focus={(e) => handleCurencyInput(e, item)}
        />
        <label for="valorVT">Valor do VT (R$)</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="valorVR"
          placeholder="valorVR"
          value={valorVR}
          on:keyup={(e) => handleCurencyInput(e, item)}
          on:focus={(e) => handleCurencyInput(e, item)}
        />
        <label for="valorVR">Valor do VR (R$)</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="valorDiaria"
          placeholder="valorDiaria"
          value={valorDiaria}
          required
          on:keyup={(e) => handleCurencyInput(e, item)}
          on:focus={(e) => handleCurencyInput(e, item)}
        />
        <label for="valorDiaria">Valor da Diária (R$)</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <div class="form-floating">
        <input
          required
          type="date"
          class="form-control"
          id="dataInicio"
          placeholder="dataInicio"
          bind:value={dataInicio}
        />
        <label for="dataInicio">
          {#if isNovaDiaria}
            Data de Início
          {:else}
            Data
          {/if}
        </label>
      </div>
    </div>

    {#if isNovaDiaria}
      <div class="col-md">
        <div class="form-floating">
          <input required type="date" class="form-control" id="dataFim" placeholder="dataFim" bind:value={dataFim} />
          <label for="dataFim">Data Fim</label>
        </div>
      </div>
    {/if}

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <button type="submit" class="btn btn-primary shadow-sm mx-2">Salvar</button>
      <button type="button" class="btn btn-light shadow-sm" on:click={voltar}>Cancelar</button>
    </div>
  </form>
</div>
