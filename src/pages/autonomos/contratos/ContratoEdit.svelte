<script lang="ts">
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import { CONTRATO_DEFAULT_VALUE, type Contrato } from '../../../models/contrato';
  import { autonomoService } from '../../../services/autonomos.service';
  import { contratoService } from '../../../services/contratos.service';
  import { stringToDecimal } from '../../../utils/actions';
  import { convertToNumber } from '../../../utils/converters';

  // Path params
  export let params: Record<string, string>;
  let autonomo: Autonomo;
  $: contratoId = params.id_contrato;
  $: autonomoId = params.id;

  let item: Contrato = { ...CONTRATO_DEFAULT_VALUE };
  $: console.log('valorVT::', item.valorVT, typeof item.valorVT);

  onMount(async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    if (contratoId !== 'novo') {
      item = await contratoService.getByID(contratoId);
    }
  });

  const voltar = () => pop();

  const salvar = async () => {
    try {
      item.valorVT = convertToNumber(item.valorVT);
      item.valorVR = convertToNumber(item.valorVR);
      item.valorDiaria = convertToNumber(item.valorDiaria);
      await contratoService.salvar(item);
      voltar();
    } catch (err) {
      console.log('Deu erro:', Error(err));
    }
  };
</script>

<div class="container">
  <Breadcrumb
    items={[
      { label: 'Autônomos', link: '#/autonomos' },
      { label: `Contratos de ${autonomo?.nome}`, link: `#/autonomos/${autonomoId}/contratos` },
    ]}
  >
    Editar Contrato
  </Breadcrumb>

  <form class="row g-2 w-50 mx-auto" on:submit|preventDefault={salvar}>
    <div class="col-md">
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="vigenciaInicio"
          placeholder="vigenciaInicio"
          bind:value={item.vigenciaInicio}
        />
        <label for="vigenciaInicio">Início da Vigência</label>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-floating">
        <input
          type="date"
          class="form-control"
          id="vigenciaFim"
          placeholder="vigenciaFim"
          bind:value={item.vigenciaFim}
        />
        <label for="vigenciaFim">Fim da Vigência</label>
      </div>
    </div>
    <div class="w-100 d-none d-md-block" />
    <div class="col-md">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="valorVT"
          placeholder="valorVT"
          use:stringToDecimal={{ obj: item, attr: 'valorVT' }}
          bind:value={item.valorVT}
        />
        <label for="valorVT">Valor do VT (R$)</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input type="valorVR" class="form-control" id="valorVR" placeholder="valorVR" bind:value={item.valorVR} />
        <label for="valorVR">Valor do VR (R$)</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input
          type="valorDiaria"
          class="form-control"
          id="valorDiaria"
          placeholder="valorDiaria"
          bind:value={item.valorDiaria}
        />
        <label for="valorDiaria">Valor da Diária (R$)</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <button type="submit" class="btn btn-primary shadow-sm mx-2">Salvar</button>
      <button type="button" class="btn btn-light shadow-sm" on:click={voltar}>Cancelar</button>
    </div>
  </form>
</div>
