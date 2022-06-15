<script lang="ts">
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import { pop } from 'svelte-spa-router';
  import Breadcrumb from '../../lib/Breadcrumb.svelte';
  import type { DiariaSelecaoPagamento } from '../../models/diaria';
  import { PAGAMENTO_DEFAULT_VALUE, type Pagamento } from '../../models/pagamento';
  import { diariasService } from '../../services/diarias.service';
  import { pagamentosService } from '../../services/pagamentos.service';
  import { formatDecimal } from '../../utils/formatters';

  let item: Pagamento = { ...PAGAMENTO_DEFAULT_VALUE };

  // Campos do form
  let diarias: DiariaSelecaoPagamento[] = [];
  let selecionarTodos = false;
  let data = DateTime.now().toISODate();
  let filtro = '';

  onMount(async () => {
    diarias = (await diariasService.listDiariasPendentesPagamento()).map((diaria) => ({
      ...diaria,
      vtSelecionado: false,
      vrSelecionado: false,
      diariaSelecionada: false,
      todosSelecionados: false,
    }));
  });

  const voltar = () => pop();

  $: exibirLinha = (diaria: DiariaSelecaoPagamento) =>
    filtro && !diaria.contrato.autonomo.nome.toLowerCase().includes(filtro.toLowerCase());

  $: valorTotal = diarias
    .filter((d) => d.vtSelecionado || d.vrSelecionado || d.diariaSelecionada)
    .map(
      (d) =>
        (d.vtSelecionado ? d.valorVT : 0) +
        (d.vrSelecionado ? d.valorVR : 0) +
        (d.diariaSelecionada ? d.valorDiaria : 0)
    )
    .reduce((previous, current) => previous + current, 0);

  const handleSelecionarColuna = (index: number) => {
    diarias[index].todosSelecionados =
      diarias[index].vtSelecionado && diarias[index].vrSelecionado && diarias[index].diariaSelecionada;
  };

  const handleSelecionarLinha = (index: number) => {
    const selecao = diarias[index].todosSelecionados;
    diarias[index].vrSelecionado = selecao;
    diarias[index].vtSelecionado = selecao;
    diarias[index].diariaSelecionada = selecao;
  };

  const handleSelecionarTodos = () => {
    diarias = diarias.map((d) => ({
      ...d,
      todosSelecionados: selecionarTodos,
      vrSelecionado: selecionarTodos,
      vtSelecionado: selecionarTodos,
      diariaSelecionada: selecionarTodos,
    }));
  };

  const salvar = async () => {
    try {
      item.data = DateTime.fromISO(data);
      item.valor = valorTotal;
      await pagamentosService.salvar(item, diarias);
      pop();
    } catch (err) {
      alert(err);
    }
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Pagamentos', link: '#/pagamentos' }]}>Criar Pagamento</Breadcrumb>

  <form class="row g-2 mx-auto" on:submit|preventDefault={salvar}>
    <div class="col-md-2">
      <div class="form-floating">
        <input id="data" type="date" class="form-control" placeholder="data" required bind:value={data} />
        <label for="data">Data</label>
      </div>
    </div>
    <!--
      <div class="col-md-3">
        <div class="form-floating">
          <input
          id="valor"
          type="text"
          class="form-control"
          placeholder="valor"
          disabled
          value={formatDecimal(valorTotal)}
          />
        <label for="valor">Valor</label>
      </div>
    </div>
  -->
    <div class="col">
      <div class="form-floating">
        <input type="text" class="form-control" id="filtro" placeholder="filtro" bind:value={filtro} />
        <label for="filtro">Filtrar autônomos</label>
      </div>
    </div>

    <table class="table table-bordered table-striped mt-4">
      <thead>
        <tr>
          <th style="width: 2rem">
            <input type="checkbox" bind:checked={selecionarTodos} on:change={handleSelecionarTodos} />
          </th>
          <th>Autônomo</th>
          <th>Diária</th>
          <th>Valor VT (R$)</th>
          <th>Valor VR (R$)</th>
          <th>Valor Diária (R$)</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        {#each diarias as diaria, index}
          <tr class:table-primary={diaria.todosSelecionados} class:d-none={exibirLinha(diaria)}>
            <td>
              <input
                type="checkbox"
                bind:checked={diaria.todosSelecionados}
                on:change={() => handleSelecionarLinha(index)}
              />
            </td>
            <td>{diaria.contrato.autonomo.nome}</td>
            <td>{diaria.data.setLocale('pt-BR').toFormat('dd/LL/yyyy - cccc').replace('-feira', '')}</td>
            <td class="text-end" class:table-primary={diaria.vtSelecionado}>
              {formatDecimal(diaria.valorVT) || '-'}
              <input
                type="checkbox"
                bind:checked={diaria.vtSelecionado}
                on:change={() => handleSelecionarColuna(index)}
                disabled={!diaria.valorVT}
              />
            </td>
            <td class="text-end" class:table-primary={diaria.vrSelecionado}>
              {formatDecimal(diaria.valorVR) || '-'}
              <input type="checkbox" bind:checked={diaria.vrSelecionado} disabled={!diaria.valorVR} />
            </td>
            <td class="text-end" class:table-primary={diaria.diariaSelecionada}>
              {formatDecimal(diaria.valorDiaria)}
              <input type="checkbox" bind:checked={diaria.diariaSelecionada} />
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7" class="text-end">
            Total do Pagamento: R$ {formatDecimal(valorTotal) || '0,00'}
          </td>
        </tr>
      </tfoot>
    </table>

    <div class="col-md text-end">
      <button type="submit" class="btn btn-primary shadow-sm mx-2">Salvar</button>
      <button type="button" class="btn btn-light shadow-sm" on:click={voltar}>Cancelar</button>
    </div>
  </form>
</div>

<style>
  tfoot {
    font-weight: bold;
  }
</style>
