<script lang="ts">
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import type { Autonomo } from '../models/autonomo';
  import { autonomoService } from '../services/autonomos.service';

  let lista: Autonomo[] = [];

  onMount(async () => {
    console.log('montou');
    lista = await autonomoService.list();
  });
</script>

<div class="container">
  <h1>Autônomos</h1>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Início Contrato</th>
        <th>Fim Contrato</th>
        <th style="width: 10rem" class="text-end">
          <a class="btn btn-primary btn-sm" href="/autonomos/novo" use:link>
            <i class="bi-plus" /> Novo
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each lista as autonomo}
        <tr>
          <td>{autonomo.nome}</td>
          <td>{autonomo.cpf}</td>
          <td>Teste</td>
          <td>Teste</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/autonomos/${autonomo.id}`} use:link>
              <i class="bi-pencil" title="Editar autônomo" />
            </a>
            <button class="btn btn-sm btn-link">
              <i class="bi-calendar2-week" title="Diárias" />
            </button>
            <button class="btn btn-sm btn-link">
              <i class="bi-cash-stack" title="Pagamentos" />
            </button>
            <button class="btn btn-sm btn-link">
              <i class="bi-trash3" title="Excluir autônomo" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
