<template id="Presentation">
  <SectionContainer :title="title" :sub-title="subTitle">
    <div slot="content">
      <p class="text1">{{ text1 }}</p>
      <div class="columns is-variable is-8">
        <div class="column">
          <img :src="image">
        </div>
        <div class="column">
          <p>{{ text2 }}</p>
        </div>
      </div>
    </div>
  </SectionContainer>
</template>

<script>
  import SectionContainer from '../Components/SectionContainer';
  import axios from 'axios';

  export default {
    name: "Presentation",
    components: {SectionContainer},
    props: {
      url: {type: String}
    },
    data() {
      return {
        title: '',
        subTitle: '',
        text1: '',
        text2: '',
        image: ''
      };
    },
    mounted() {
      axios.get(this.url).then(response => {
        let data = response.data[0];
        this.title = data.title;
        this.subTitle = data.sub_title;
        this.text1 = data.text1;
        this.text2 = data.text2;
        this.image = data.image.image;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .text1 {
    margin-bottom: 40px !important;
  }

</style>
