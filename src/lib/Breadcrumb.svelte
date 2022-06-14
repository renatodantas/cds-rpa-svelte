<script lang="ts">
  interface BreadcrumbItem {
    link: string;
    label: string;
  }
  export let items: BreadcrumbItem[] = [];
</script>

<nav aria-label="breadcrumb" class="shadow pb-1 pt-3 ps-3 mb-4">
  <ol class="breadcrumb">
    {#each items as { link, label }}
      <li class="breadcrumb-item">
        <a href={link}>{label}</a>
      </li>
    {/each}
    <li class="breadcrumb-item active" aria-current="page">
      <strong><slot /></strong>
    </li>
  </ol>
</nav>
