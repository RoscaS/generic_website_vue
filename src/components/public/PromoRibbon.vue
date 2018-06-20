<template>
  <div class="collapse">

    <div class="collapse-trigger"
         @mouseenter="showPromo"
         @mouseleave="hidePromo"
         @click="lockPromo">

      <div class="corner-ribbon top-right"
           :title="title"
           slot="trigger">
        Action spéciale !
      </div>
    </div>

    <VueSlideUpDown :active="isOpen" :duration="1000">
      <div class="container collapse-content _wrapper">
        <div class="columns">

          <div class="column is-4 is-offset-2-tablet _left">
            <img src="../../assets/action.jpg">
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
        isOpen: false,
        timeout: null,
        isLocked: false,
        title: "Cliquez pour vérouiller.",
      };
    },

    computed: {
      isMobile() {
        return window.innerWidth <= 1024;
      }
    },

    methods: {
      checkScroll() {
        if (window.pageYOffset > 100) {
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
          this.title = 'Cliquez pour vérouiller.';
          this.isLocked = false;
          this.isOpen = false;
          console.log('off');
          window.removeEventListener('scroll', this.checkScroll);
          if (!this.isMobile) {
            this.$toast.open(
              'Action spéciale dévérouillée &nbsp;' +
              '<i class="fal fa-lock-open-alt"></i>'
            );
          }
        }
        else {
          this.title = 'Cliquez pour dévérouiller.';
          this.isLocked = true;
          this.isOpen = true;
          console.log('on');
          window.addEventListener('scroll', this.checkScroll);

          if (!this.isMobile) {
            this.$toast.open(
              'Action spéciale vérouillée &nbsp;' +
              '<i class="fal fa-lock-alt"></i>'
            );
          }
        }
      }
    }
  };
</script>


<style scoped lang="scss">
  @import 'sass/global';

  ._wrapper {
    height: 400px;
    margin-top: 150px;

    @media screen and (max-width: 400px) {
      height: 600px;
      margin-bottom: -500px;
    }

    img {
      width: 400px;
    }

    ._left {
      @media screen and (max-width: 400px) {
        margin-top: -60px;
        margin-bottom: -40px;
      }
    }

    ._right {
      padding: 40px;
    }
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
