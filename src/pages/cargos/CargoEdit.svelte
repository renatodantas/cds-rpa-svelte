<script lang="ts">
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import { CARGO_DEFAULT_VALUE, type Cargo } from '../../models/cargo';
  import { cargosService } from '../../services/cargos.service';

  // Path params
  export let params: Record<string, string>;

  let item: Cargo = { ...CARGO_DEFAULT_VALUE };

  onMount(async () => {
    if (params.id !== 'novo') {
      item = await cargosService.getByID(params.id);
    }
  });

  const voltar = () => pop();

  const salvar = async () => {
    try {
      await cargosService.salvar(item);
      pop();
    } catch (err) {
      console.log('Deu erro:', Error(err));
    }
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Cargos', link: '#/cargos' }]}>Editar Cargo</Breadcrumb>

  <form class="row g-2 w-50 mx-auto" on:submit|preventDefault={salvar}>
    <div class="col-md">
      <div class="form-floating">
        <input type="text" class="form-control" id="nome" placeholder="nome" bind:value={item.descricao} />
        <label for="nome">Descrição</label>
      </div>
    </div>
    <div class="w-100 d-none d-md-block" />
    <div class="col-md-4">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="ccCodigo"
          placeholder="ccCodigo"
          bind:value={item.centroCustoCodigo}
        />
        <label for="ccCodigo">Centro de Custo</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input
          type="banco"
          class="form-control"
          id="banco"
          placeholder="banco"
          bind:value={item.centroCustoDescricao}
        />
        <label for="banco">Descrição do Centro de Custo</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <button type="submit" class="btn btn-primary shadow-sm mx-2">Salvar</button>
      <button type="button" class="btn btn-light shadow-sm" on:click={voltar}>Cancelar</button>
    </div>
  </form>
</div>
