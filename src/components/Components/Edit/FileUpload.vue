<template>
  <div>
    <div class="label">Image</div>
    <div class="dropbox">
      <input type="file" id="file" ref="file" @change="fileUpload" class="input-file">
      <p>
        <i class="fal fa-cloud-upload fa-2x"></i><br>
        Glissez une image ici<br>
        <small>ou cliquez pour naviguer votre disque.</small>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';


  export default {
    name: "FileUpload",
    data() {
      return {};
    },

    computed: {
      root() { return this.$parent.$parent; },
    },

    methods: {
      fileUpload() {
        let file = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('image', file);
        formData.append('gallery', '_temp');
        axios.post('http://localhost:8000/images/',
          formData,
          {
            headers: {'content-type': 'multipart/form-data'},
          }
        ).then(response => {
          console.log(response);
          this.root.image = response.data.image;
        }).catch(error => {
          this.$toast.open({
            duration: 4000,
            message: '.jpg ou .png uniquement!',
            type: 'is-danger'
          });
          console.log(error);
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .label {
    color: white;
    font-size: 16px;
  }

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    /*min-height: 200px; !* minimum height *!*/
    position: relative;
    cursor: pointer;
    height: auto;
    width: auto;
    border-radius: 2%;

    p {
      font-size: 1.2em;
      text-align: center;
      padding: 50px 0;
    }

    &:hover {
      background: lightblue;
    }
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 90%;
    height: 90%;
    position: absolute;
    cursor: pointer;
  }

</style>


