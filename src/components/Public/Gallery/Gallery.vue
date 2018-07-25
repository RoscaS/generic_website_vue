<template>
  <section id="Galerie" class="section section-container">
    <div class="container">


      <div class="content">
        <Title>{{ title }}</Title>
        <p class="sub-title">{{ subTitle }}</p>
        <div class="columns is-multiline">
          <div class="column is-3 gallery-col"
               v-for="image in images"
               v-scroll-reveal="{
                origin: 'left',
                distance: '100px',
                duration: 1500,
                delay: 200,
                easing: 'ease',
               }">
            <a class="no-tr"
               :href="image.url"
               :description="image.description"
               v-lightbox
               @click="clickImage(image)">
              <img :src="image.url"
                   :class="[imgClass, {'img-selected': image.selected}]"/>
            </a>
          </div>

        </div>



        <Lightbox v-if="!isAdmin"></Lightbox>
      </div>


    </div>
  </section>
</template>

<script>
  import draggable from 'vuedraggable'

  import Lightbox from '../../Components/Lightbox/Lightbox';
  import Title from '../../Components/Title';

  import axios from 'axios';

  export default {
    name: "Gallery",
    components: {draggable, Lightbox, Title},
    props: {
      url: {type: String},
      urlSectionData: {type: String},
    },

    data() {
      return {
        isAdmin: true,
        title: '',
        subTitle: '',
        images: []
      };
    },

    computed: {
      imgClass() { return this.isAdmin ? 'img-admin' : 'img-user'; }
    },

    methods: {
      clickImage(image) {
        if (!this.isAdmin) {
          this.lockScroll();
        }
        else {
          image.selected = !image.selected;
        }
      },

      lockScroll() {
        let x = window.scrollX;
        let y = window.scrollY;
        window.onscroll = function() {window.scrollTo(x, y);};
      }
    },

    mounted() {
      axios.get(this.url).then(response => {
        response.data.images.forEach(image => {
          this.images.push({
            url: image.image,
            description: image.description,
            position: image.position,
            selected: false,
          });
        });
        this.images.sort((a, b) => a.position - b.position)
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });

      axios.get(this.urlSectionData).then(response => {
        let data = response.data;
        this.title = data.title;
        this.subTitle = data.sub_title;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  img {
    cursor: pointer;
    transition: box-shadow .5s ease, transform .5s ease-out;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    transform: scale(1);
  }

  .img-user {
    &:hover {
      transition: box-shadow .5s ease, transform .5s ease-out;
      -webkit-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      transform: scale(1.1);
    }
  }

  .img-admin {
    &:hover {
      /*transition: box-shadow .5s ease-out;*/
      /*-webkit-box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
      /*-moz-box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
      /*box-shadow: 0 0 28px 5px rgba(0,0,0,.41);*/
    }
  }

  .img-selected {
    transition: box-shadow .1s ease, transform .5s ease-out;
    -webkit-box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
    -moz-box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
    box-shadow: 0 0 8px 5px rgba(114, 165, 211, 1);
  }

</style>
