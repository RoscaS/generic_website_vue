<template>
  <div id="app">
    <section class="section"><Top></Top></section>
    <Toggle></Toggle>
  </div>
</template>

<script>
import Top from './components/public/Top'
import Toggle from './components/public/toggleTest'

export default {
  name: 'App',
  components: {Top, Toggle}
}
</script>

<style scoped lang="scss">
.poule {
  height: 4000px;
}
</style>
