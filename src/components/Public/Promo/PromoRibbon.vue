<template>
  <div class="collapse">

    <div class="collapse-trigger"
         @mouseenter="showPromo"
         @mouseleave="hidePromo"
         @click="lockPromo">

      <div class="corner-ribbon top-right"
           :title="hoverTitle"
           slot="trigger">
        Action spéciale !
      </div>
    </div>

    <VueSlideUpDown :active="isOpen" :duration="1000">
      <Promo></Promo>
    </VueSlideUpDown>

  </div>
</template>

<script>
  import VueSlideUpDown from 'vue-slide-up-down';
  import Promo from './Promo'


  export default {
    name: "PromoRibbon",
    components: { Promo, VueSlideUpDown },
    data() {
      return {
        isOpen: false,
        timeout: null,
        isLocked: false,
        hoverTitle: "Cliquez pour vérouiller.",
      };
    },
    computed: {
      isTouch() { return window.innerWidth <= 1024; }
    },
    methods: {
      checkScroll() {
        if (window.pageYOffset > 0) {
          this.lockPromo();
        }
      },
      showPromo() {
        if (!this.isLocked) {
          this.timeout = setTimeout(() => {this.isOpen = true;}, 200);
        }
      },
      hidePromo() {
        clearTimeout(this.timeout);
        if (!this.isLocked) {
          this.isOpen = false;
        }
      },
      lockPromo() {
        if (this.isLocked) {
          this.hoverTitle = 'Cliquez pour vérouiller.';
          this.isLocked = false;
          this.isOpen = false;
          window.removeEventListener('scroll', this.checkScroll);
          if (!this.isTouch) {
            this.$toast.open(
              'Action spéciale dévérouillée &nbsp;' +
              '<i class="fal fa-lock-open-alt"></i>'
            );
          }
        }
        else {
          this.hoverTitle = 'Cliquez pour dévérouiller.';
          this.isLocked = true;
          this.isOpen = true;
          window.addEventListener('scroll', this.checkScroll);
          if (!this.isTouch) {
            this.$toast.open(
              'Action spéciale vérouillée &nbsp;' +
              '<i class="fal fa-lock-alt"></i>'
            );
          }
        }
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

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
