<script lang="ts">
  import { onMount } from 'svelte';
  import Breadcrumb from '../../../lib/Breadcrumb.svelte';
  import type { Autonomo } from '../../../models/autonomo';
  import type { Diaria } from '../../../models/diaria';
  import { autonomoService } from '../../../services/autonomos.service';
  import { diariasService } from '../../../services/diarias.service';

  // Path params
  export let params: Record<string, string>;
  let itens: Diaria[] = [];
  let autonomo: Autonomo;

  $: autonomoId = params.id;

  onMount(async () => {
    await listar();
  });

  const listar = async () => {
    autonomo = await autonomoService.getByID(autonomoId);
    itens = await diariasService.list(autonomoId);
  };
</script>

<div class="container">
  <Breadcrumb items={[{ label: 'Autônomos', link: '#/autonomos' }]}>
    Diárias de {autonomo?.nome}
  </Breadcrumb>

  <div class="d-flex justify-content-center">Registro das diárias aqui</div>
</div>
