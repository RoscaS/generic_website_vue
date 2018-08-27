<template>
  <BaseLayout :store="store">
    <div class="text1"
         v-scroll-reveal="sReveal('left', 250, 400)">
      <p :class="{'highlighted': highlighted(2)}">
        {{ state.text1.data }}
      </p>
    </div>
    <div class="columns is-variable is-8">
      <div class="column">
        <EditIcon :edit="galleriesEdit" :store="store.gallery"
                  top="20px" right="20px" :small="true"/>
        <img :src="image"
             v-scroll-reveal="sReveal('bottom', 300, 10)"/>
      </div>
      <div class="column"
           v-scroll-reveal="sReveal('right', 350, 400)">
        <p :class="{'highlighted': highlighted(3)}">
          {{ state.text2.data }}
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
  import ViewsMixin from '../mixins/ViewsMixin';
  import EditIcon from '../components/Edit/EditIcon';


  export default {
    name: "Presentation",
    mixins: [ViewsMixin],
    components: {EditIcon},
    data: () => ({
      component: "Presentation",
      type: 'text',
      downArrow: null,
    }),
    computed: {
      image() {
        try {
          let gallery = this.galleriesEdit.getStore('Presentation');
          return this.getImage(0, gallery).image;
        } catch (e) {
          setTimeout(() => {return this.computed}, 100);
        }
      }
    },
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

