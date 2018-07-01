<template>
  <section :id="id" class="hero is-large parallax has-text-centered">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Parallax",
    props: {
      url: {type: String},
      idx: {type: Number},
      height: {type: Number}
    },
    data() {
      return {
        image: null,
        title: null,
      };
    },
    computed: {
      id() {return 'parallax' + this.idx;}
    },
    mounted() {
      axios.get(this.url).then(response => {
        this.image = response.data.images[this.idx].image;
        this.title = response.data.images[this.idx].description;
        let img = document.getElementById(this.id);
        img.style.backgroundImage = 'url(' + this.image + ')';
        img.style.minHeight = this.height + 'px';
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });


    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  h1 {
    color: white;
    font-size: 50px;
    font-weight: normal;
  }

  .parallax {
    opacity: 0.75;
    position: relative;

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
