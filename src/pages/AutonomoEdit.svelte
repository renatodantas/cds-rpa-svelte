<script lang="ts">
  import { onMount } from 'svelte';
  import { AUTONOMO_DEFAULT_VALUE, type Autonomo } from '../models/autonomo';
  import { AutonomosService } from '../services/autonomos.service';

  // Path params
  export let params: Record<string, string>;

  const service = new AutonomosService();
  let item: Autonomo = { ...AUTONOMO_DEFAULT_VALUE };

  onMount(async () => {
    item = (await service.getByID(params.id)) || { ...AUTONOMO_DEFAULT_VALUE };
  });
</script>

<div class="container">
  <h1 class="mb-5">Editar Autônomo</h1>

  <form class="row g-2 w-50 mx-auto">
    <div class="col-md">
      <div class="form-floating">
        <input type="text" class="form-control" id="nome" placeholder="nome" />
        <label for="nome">Nome</label>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-floating">
        <input type="cpf" class="form-control" id="cpf" placeholder="cpf" />
        <label for="cpf">CPF</label>
      </div>
    </div>
    <div class="w-100 d-none d-md-block" />
    <div class="col-md">
      <div class="form-floating">
        <input type="banco" class="form-control" id="banco" placeholder="banco" />
        <label for="banco">Banco</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input type="agencia" class="form-control" id="agencia" placeholder="agencia" />
        <label for="agencia">Agência</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating">
        <input type="cpf" class="form-control" id="conta" placeholder="conta" />
        <label for="conta">Conta</label>
      </div>
    </div>
    <div class="col-md-2">
      <div class="form-floating">
        <input type="operacao" class="form-control" id="operacao" placeholder="operacao" />
        <label for="operacao">Operação</label>
      </div>
    </div>

    <div class="w-100 d-none d-md-block" />

    <div class="col-md-2">
      <button class="btn btn-primary">Salvar</button>
    </div>
  </form>
</div>
