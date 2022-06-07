<script lang="ts">
  import { link, location } from 'svelte-spa-router';
</script>

<div class="container">
  <header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a href="/" use:link class="nav-link" class:active={$location === '/'} aria-current="page"> Home </a>
      </li>
      <li class="nav-item">
        <a href="/cargos" use:link class="nav-link" class:active={$location.startsWith('/cargos')}> Cargos </a>
      </li>
      <li class="nav-item">
        <a href="/autonomos" use:link class="nav-link" class:active={$location.startsWith('/autonomos')}> Autônomos </a>
      </li>
    </ul>
  </header>
</div>

<style>
</style>
