<script lang="ts">
  import Router from 'svelte-spa-router';
  import Header from './lib/Header.svelte';
  import { routes } from './routes';
</script>

<main>
  <Header />
  <Router {routes} />
</main>
