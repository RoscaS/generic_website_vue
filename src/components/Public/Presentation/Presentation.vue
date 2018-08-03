<template>
  <div>
    <DownArrow></DownArrow>
    <BaseLayout :id="name"
                :title="state.title.data"
                :subTi="state.subTi.data"
                :state="state"
                :activeTab="activeTab"
                :loading="loading"
                @changeTab="activeTab=$event">
      <p class="text1"
         :class="{'highlighted': highlighted(2)}"
         v-scroll-reveal="sReveal('left', 250, 400)">
        {{ state.text1.data }}
      </p>
      <div class="columns is-variable is-8">
        <div class="column">
          <img :src="state.image.data"
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
  import DownArrow from '../../../components/Components/Carousel/DownArrow.vue'
  import PresentationStore from './PresentationStore';
  import mixin from '../../../mixins/Public/PublicMixin';

  export default {
    name: "Presentation",
    mixins: [mixin],
    components: {DownArrow},
    data() {
      return {
        store: PresentationStore,
        state: {
          title: {data: '', len: '35', label: 'Titre',},
          subTi: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre',},
          text1: {data: '', type: 'textarea', len: '400', rows: '5', label: 'Texte 1',},
          text2: {data: '', type: 'textarea', len: '400', rows: '5', label: 'Texte 2',},
          image: {data: '', label: 'Image',},
        },
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
  @import '../../../../static/sass/global';
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
