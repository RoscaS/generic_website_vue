<template>
  <div>
    <input type="file" id="file" ref="file" @change="handleFileUpload">
    <br>
    <br>
    <button class="button is-outlined is-success"
            @click="submitFile">Upload</button>
  </div>
</template>

<script>
  import axios from 'axios';


  export default {
    name: "FileUpload",
    data() {
      return {
        file: '',
      };
    },
    methods: {
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
      },

      submitFile() {
        let formData = new FormData();
        formData.append('image', this.file);
        formData.append('gallery', 'carousel');

        axios.post('http://localhost:8000/images/',
          formData,
          {
            headers: {'content-type': 'multipart/form-data'},
          }
        ).then(response => console.log(response)
        ).catch(error => console.log(error))
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>


