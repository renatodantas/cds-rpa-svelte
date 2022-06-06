<script lang="ts">
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import { AUTONOMO_DEFAULT_VALUE, type Autonomo } from '../../models/autonomo';
  import { autonomoService } from '../../services/autonomos.service';

  // Path params
  export let params: Record<string, string>;

  let item: Autonomo = { ...AUTONOMO_DEFAULT_VALUE };

  onMount(async () => {
    if (params.id !== 'novo') {
      item = await autonomoService.getByID(params.id);
    }
  });

  const voltar = () => pop();

  const salvar = async () => {
    try {
      await autonomoService.salvar(item);
      voltar();
    } catch (err) {
      console.log('Deu erro:', Error(err));
    }
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Autônomos', link: '#/autonomos' }]}>Editar Autônomo</Breadcrumb>

  <form class="row g-2 w-50 mx-auto" on:submit|preventDefault={salvar}>
    <div class="col-md">
      <div class="form-floating">
        <input type="text" class="form-control" id="nome" placeholder="nome" bind:value={item.nome} />
        <label for="nome">Nome</label>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-floating">
        <input type="cpf" class="form-control" id="cpf" placeholder="cpf" bind:value={item.cpf} />
        <label for="cpf">CPF</label>
      </div>
    </div>
    <div class="w-100 d-none d-md-block" />
    <div class="col-md">
      <div class="form-floating">
        <input type="banco" class="form-control" id="banco" placeholder="banco" bind:value={item.banco} />
        <label for="banco">Banco</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input type="agencia" class="form-control" id="agencia" placeholder="agencia" bind:value={item.agencia} />
        <label for="agencia">Agência</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input type="cpf" class="form-control" id="conta" placeholder="conta" bind:value={item.conta} />
        <label for="conta">Conta</label>
      </div>
    </div>
    <div class="col-md-2">
      <div class="form-floating">
        <input type="operacao" class="form-control" id="operacao" placeholder="operacao" bind:value={item.operacao} />
        <label for="operacao">Op.</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md">
      <button type="submit" class="btn btn-primary shadow-sm mx-2">Salvar</button>
      <button type="button" class="btn btn-light shadow-sm" on:click={pop}>Cancelar</button>
    </div>
  </form>
</div>
