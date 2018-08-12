<template>
  <div>
    <DownArrow></DownArrow>
    <BaseLayout :store="store" editNavHeight="200">
      <div class="text1"
           v-scroll-reveal="sReveal('left', 250, 400)">
        <p :class="{'highlighted': highlighted(2)}">
          {{ state.text1.data }}
        </p>
      </div>
      <div class="columns is-variable is-8">
        <div class="column">
          <img :src="state.image.data.image"
               :class="{'highlighted': highlighted(4)}"
               v-scroll-reveal="sReveal('bottom', 300, 10)">
        </div>
        <div class="column"
             v-scroll-reveal="sReveal('right', 350, 400)">
          <p :class="{'highlighted': highlighted(3)}">
            {{ state.text2.data }}
          </p>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
  import DownArrow from '../components/Carousel/DownArrow.vue'
  import ViewsMixin from '../mixins/ViewsMixin';

  export default {
    name: "Presentation",
    mixins: [ViewsMixin],
    components: {DownArrow},
    data() {
      return {
        component: "Presentation",
        type: 'text',
        downArrow: null,
      };
    },
    methods: {
      scrollWatch() {
        if (window.pageYOffset >= 165) {
          this.downArrow.classList.remove('fadeInDown');
          this.downArrow.classList.add('fadeOutDown');
          window.removeEventListener('scroll', this.scrollWatch);
        }
      },
      setDownArrow() {
        setTimeout(() => {
          this.downArrow = document.getElementsByClassName('down-arrow')[0];
          this.downArrow.classList.add('fadeInDown');
          setTimeout(() => {
            Velocity(this.downArrow, {opacity: '1'});
          }, 1000);
        }, 1800);
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollWatch);
      this.setDownArrow();
    }
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';
  .section {
    margin-top: -50px !important;
    @media screen and (max-width: 1366px) {
      margin-top: 25px !important;
    }
  }

  .text1 {
    margin-bottom: 40px !important;
  }
</style>
