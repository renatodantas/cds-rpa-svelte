<script lang="ts">
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import { CONTRATO_DEFAULT_VALUE, type Contrato } from '../../../models/contrato';
  import { contratoService } from '../../../services/contratos.service';
  import { convertStringToDecimal } from '../../../utils/converters';

  // Path params
  export let params: Record<string, string>;
  $: contratoId = params.id_contrato;

  let item: Contrato = { ...CONTRATO_DEFAULT_VALUE };

  onMount(async () => {
    if (contratoId !== 'novo') {
      item = await contratoService.getByID(contratoId);
    }
  });

  // const atualizar = (event, field) => {
  //   console.log(event);
  //   item[field] = event.target.value;
  // };

  const voltar = () => pop();

  const salvar = async () => {
    try {
      item.valorVT = convertStringToDecimal(item.valorVT.toString());
      item.valorVR = convertStringToDecimal(item.valorVR.toString());
      item.valorDiaria = convertStringToDecimal(item.valorDiaria.toString());

      await contratoService.salvar(item);
      voltar();
    } catch (err) {
      console.log('Deu erro:', Error(err));
    }
  };
</script>

<div class="container">
  <h1 class="mb-4">Editar Contrato</h1>

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
          type="number"
          step="0.01"
          class="form-control"
          id="valorVT"
          placeholder="valorVT"
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
