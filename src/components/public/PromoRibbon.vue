<template>
  <div class="collapse">

    <div class="collapse-trigger" @click="toggle">
      <div class="corner-ribbon top-right"
           title="Cliquez pour vérouiller."
           slot="trigger">
        Action spéciale !
      </div>
    </div>

    <VueSlideUpDown :active="isOpen" :duration="1000">
      <div class="container collapse-content _wrapper">
        <div class="columns">
          <div class="column is-4 is-offset-2 _left">
            <img src="../../assets/action.jpg" width="400px">
          </div>

          <div class="column is-5 content _right">
            <h3>
              <strong>Le titre</strong>
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda atque culpa dolorum ducimus earum et explicabo
              facilis
              illo incidunt iure nesciunt obcaecati officiis perspiciatis
              praesentium reiciendis reprehenderit, temporibus velit
              voluptatem.</p>
          </div>
        </div>
      </div>
    </VueSlideUpDown>

  </div>
</template>


<script>
  import VueSlideUpDown from 'vue-slide-up-down';

  export default {
    name: "Promo_ribbon",
    components: {VueSlideUpDown},

    data() {
      return {
        isOpen: false
      };
    },
    watch: {
      open(value) { this.isOpen = value; }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
        this.$emit('update:open', this.isOpen);
        this.$emit(this.isOpen ? 'open' : 'close');
      }
    }
  };
</script>


<style scoped lang="scss">
  @import 'sass/global';


  ._wrapper {
    margin-top: 80px;
  }

  ._left {

  }

  ._right {
    padding: 40px;
  }

  .corner-ribbon {
    cursor: default;
    font-weight: bold;
    font-size: 20px;
    width: 300px;
    background: $ribbon-action;
    position: absolute;
    text-align: center;
    line-height: 50px;
    letter-spacing: 1px;
    color: $ribbon-action-text;
    z-index: 2;
    top: 55px;
    right: -70px;
    left: auto;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

</style>
