<script lang="ts">
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../models/autonomo';
  import { autonomoService } from '../../services/autonomos.service';

  let itens: Autonomo[] = [];

  onMount(() => listar());

  async function listar() {
    itens = await autonomoService.list();
  }

  async function remover(item: Autonomo) {
    if (await autonomoService.remover(item)) {
      listar();
    }
  }
</script>

<div class="container">
  <Breadcrumb>Autônomos</Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th style="width: 13rem" class="text-end">
          <a class="btn btn-primary btn-sm" href="#/autonomos/novo">
            <i class="bi-plus" /> Novo
          </a>
        </th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each itens as item}
        <tr>
          <td>{item.nome}</td>
          <td>{item.cpf}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/autonomos/${item.id}`} use:link>
              <i class="bi-pencil" title="Editar autônomo" />
            </a>
            <a class="btn btn-sm btn-link" href={`/autonomos/${item.id}/contratos`} use:link>
              <i class="bi-journal-check" title="Contratos" />
            </a>
            <a class="btn btn-sm btn-link" href={`/autonomos/${item.id}/diarias`} use:link>
              <i class="bi-calendar-check" title="Diárias" />
            </a>
            <!--
              <a class="btn btn-sm btn-link" href={`/autonomos/${item.id}/pagamentos`} use:link>
                <i class="bi-cash-stack" title="Pagamentos" />
              </a>
            -->
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => remover(item)}>
              <i class="bi-trash3" title="Excluir autônomo" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
