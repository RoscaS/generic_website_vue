<template>
  <div class="content">
    <SectionContainer :title="title" :sub-title="subTitle">
      <div slot="content">
        <div id="GalleryColumns" class="columns is-multiline">
          <div id="Verge" class="column is-3 gallery-col"
               v-for="image in images"
               v-scroll-reveal="{
                origin: 'left',
                distance: '400px',
                duration: 600,
                delay: 200,
                easing: 'ease',
               }">
            <a class="no-tr"
               :href="image.url"
               :description="image.description"
               v-lightbox
               @click="disableScrolling">
              <img :src="image.url"/>
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
    <Lightbox></Lightbox>
  </div>

</template>

<script>
  import SectionContainer from '../Components/SectionContainer';
  import Lightbox from '../Components/Lightbox/Lightbox';
  import axios from 'axios';

  export default {
    name: "Gallery",
    components: {SectionContainer, Lightbox},
    props: {
      url: {type: String},
      urlSectionData: {type: String},
    },

    data() {
      return {
        title: '',
        subTitle: '',
        images: []
      };
    },

    methods: {
      disableScrolling() {
        let x = window.scrollX;
        let y = window.scrollY;
        window.onscroll = function() {window.scrollTo(x, y);};
      }
    },

    mounted() {
      axios.get(this.url).then(response => {
        let images = response.data.images;
        images.forEach(i => {
          this.images.push({
            url: i.image,
            description: i.description
          });
        });
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });

      axios.get(this.urlSectionData).then(response => {
        let data = response.data[0];
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
  @import '../../../static/sass/global';

  img {
    cursor: pointer;
    transition: box-shadow .5s ease, transform .5s ease;
    box-shadow: none;
    transform: scale(1);

    &:hover {
      transition: box-shadow .5s ease, transform .5s ease;
      box-shadow: 10px 10px 29px -7px rgba(0, 0, 0, 0.75);
      transform: scale(1.1);
    }
  }

</style>
