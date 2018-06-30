<template>

  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <div class="content">

            <a class="button is-outlined is-white" @click="toggle">toggle</a>

            <ul v-for="i in noms">
              <VueSlideUpDown :active="i.active" :duration="300" tag="li" :style="isActive(i)">
                <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
                  <h3 v-bind="noms[i]" v-if="i.active">{{ i.nom }}</h3>
                </transition>
              </VueSlideUpDown>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>
  </div>


</template>

<script>
  import VueSlideUpDown from 'vue-slide-up-down';

  export default {
    name: "toggleTest",
    components: { VueSlideUpDown },
    data() {
      return {
        count: 0,
        noms: [
          {active: false, nom: 'Joe'},
          {active: false, nom: 'Max'},
          {active: false, nom: 'Jules'},
          {active: false, nom: 'John'},
        ]
      };
    },

    methods: {
      toggle() {
        this.noms[this.count].active = !this.noms[this.count].active;
        this.count == this.noms.length - 1 ? this.count = 0 : this.count++;
      },

      isActive(idx) { return idx.active? '': 'transition-delay: .3s'; }
    }
  };
</script>



<style scoped lang="scss">
  @import '../../../static/sass/global';

  h3 {
    color: white !important;
  }

</style>
