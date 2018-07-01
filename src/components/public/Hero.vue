<template>
  <section class="section hero">
    <div class="container">

      <div class="columns is-variable is-8">
        <div class="column"
             v-scroll-reveal="{
                 origin: 'left',
                 distance: '400px',
                 duration: 1500,
                 easing: 'ease'
                 }">
          <i :class="icon1"></i>
          <h2 class="subtitle">{{ title1 }}</h2>
          <p>{{ text1 }}</p>
        </div>
        <div class="column"
             v-scroll-reveal="{
                 duration: 1500,
                 easing: 'ease'
                 }">
          <i :class="icon2"></i>
          <h2 class="subtitle">{{ title2 }}</h2>
          <p>{{ text2 }}</p>
        </div>
        <div class="column"
             v-scroll-reveal="{
                 origin: 'right',
                 distance: '400px',
                 duration: 1500,
                 easing: 'ease'
                 }">
          <i :class="icon3"></i>
          <h2 class="subtitle">{{ title3 }}</h2>
          <p>{{ text3 }}</p>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
  import axios from 'axios';


  export default {
    name: "Hero",
    props: {
      url: {type: String}
    },
    data() {
      return {
        icon1: '',
        icon2: '',
        icon3: '',
        title1: '',
        title2: '',
        title3: '',
        text1: '',
        text2: '',
        text3: '',
      };
    },

    mounted() {
      axios.get(this.url).then(response => {
        console.log(response.data);
        let data = response.data[0];
        this.icon1 = data.icon1;
        this.icon2 = data.icon2;
        this.icon3 = data.icon3;
        this.title1 = data.title1;
        this.title2 = data.title2;
        this.title3 = data.title3;
        this.text1 = data.text1;
        this.text2 = data.text2;
        this.text3 = data.text3;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .hero {
    margin-top: 20px;
    text-align: center;
    background-color: $separator;

    h1, h2, p {
      color: white;
    }

    h2 {
      font-weight: bold;
    }

    p {
      font-size: 15px;
      font-weight: 400;
    }

    i {
      font-size: 60px;
      color: white;
      margin-bottom: 30px;
    }
  }


</style>
