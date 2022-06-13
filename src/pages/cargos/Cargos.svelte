<script lang="ts">
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import type { Cargo } from '../../models/cargo';
  import { cargosService } from '../../services/cargos.service';

  let itens: Cargo[] = [];

  onMount(() => listar());

  async function listar() {
    itens = await cargosService.list();
  }

  async function remover(item: Cargo) {
    if (await cargosService.remover(item)) {
      listar();
    }
  }
</script>

<div class="container">
  <Breadcrumb>Cargos</Breadcrumb>

  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Centro de Custo</th>
        <th style="width: 6rem" class="text-end">
          <a class="btn btn-primary btn-sm" href="/cargos/novo" use:link>
            <i class="bi-plus" /> Novo
          </a>
        </th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each itens as item}
        <tr>
          <td>{item.descricao}</td>
          <td>{item.centroCustoCodigo} - {item.centroCustoDescricao}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-link" href={`/cargos/${item.id}`} use:link>
              <i class="bi-pencil" title="Editar cargo" />
            </a>
            <button class="btn btn-sm btn-link" on:click|preventDefault={() => remover(item)}>
              <i class="bi-trash3" title="Excluir cargo" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
