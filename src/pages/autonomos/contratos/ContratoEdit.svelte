<script lang="ts">
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Cargo } from '../../../models/cargo';
  import { CONTRATO_DEFAULT_VALUE, type Contrato } from '../../../models/contrato';
  import { autonomoService } from '../../../services/autonomos.service';
  import { cargosService } from '../../../services/cargos.service';
  import { contratoService } from '../../../services/contratos.service';
  import { formatDecimal } from '../../../utils/formatters';
  import { handleCurencyInput } from '../../../utils/input-masks';

  // Path params
  export let params: Record<string, string>;
  let autonomo: Autonomo;
  let cargos: Cargo[] = [];
  let valorVT: string;
  let valorVR: string;
  let valorDiaria: string;

  $: contratoId = params.id_contrato;
  $: autonomoId = params.id;

  let item: Contrato = { ...CONTRATO_DEFAULT_VALUE };

  onMount(async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    cargos = await cargosService.list();
    if (contratoId !== 'novo') {
      item = await contratoService.getByID(contratoId);
    }
    valorVT = formatDecimal(item.valorVT) || '';
    valorVR = formatDecimal(item.valorVR) || '';
    valorDiaria = formatDecimal(item.valorDiaria) || '';
  });

  const voltar = () => pop();

  const salvar = async () => {
    try {
      item.idAutonomo = autonomo.id;
      await contratoService.salvar(item);
      voltar();
    } catch (err) {
      alert(JSON.stringify(err));
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
        <select class="form-select" id="cargo" aria-label="Cargo" required bind:value={item.idCargo}>
          {#each cargos as cargo}
            <option value={cargo.id}>{cargo.descricao}</option>
          {/each}
        </select>
        <label for="cargo">Cargo</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <div class="form-floating">
        <input
          required
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
          required
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
          type="valorDiaria"
          class="form-control"
          id="valorDiaria"
          placeholder="valorDiaria"
          value={valorDiaria}
          on:keyup={(e) => handleCurencyInput(e, item)}
          on:focus={(e) => handleCurencyInput(e, item)}
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
