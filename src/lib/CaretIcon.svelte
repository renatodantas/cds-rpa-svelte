<script lang="ts">
  export let isClosed = false;
</script>

<i class="bi" class:bi-caret-right-fill={isClosed} class:bi-caret-down-fill={!isClosed} />
