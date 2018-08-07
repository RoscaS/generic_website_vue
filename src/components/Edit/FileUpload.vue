<template>
  <div>
    <div class="dropbox"
         :class="{'disabled-dropbox': loading}">
      <input class="input-file"
             type="file"
             id="file"
             ref="file"
             :disabled="loading"
             @change="fileUpload">
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
  const url = 'images/';

  export default {
    name: "FileUpload",
    props: {
      gallery: {type: String, default: '_temp'},
      edit: {type: Object},
    },
    data() {
      return {
        // edit: this.edit
      };
    },

    computed: {
      loading() { return this.edit.loading; },
    },

    methods: {
      fileUpload() {
        let file = this.$refs.file.files[0];
        let formData = new FormData();


        let gallery = this.gallery;
        if (gallery == 'gallery') gallery = 'events';
        console.log(gallery);


        formData.append('image', file);
        formData.append('gallery', gallery);



        axios.post(url, formData, {
            headers: {'content-type': 'multipart/form-data'},
          }
        ).then(response => {
          this.$emit('image-preview', response.data);
          this.edit.dirty = true;
          this.edit.sendUpdateSignal()
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
  @import '../../../static/sass/global';

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
    cursor: pointer;
    height: auto;
    width: 80%;
    margin: 0 auto 0 auto;
    border-radius: 2%;

    &.mobile {
      margin-top: 20px;
    }

    p {
      font-size: 1.2em;
      text-align: center;
      /*padding-top: 20px;*/
      /*padding-bottom: 20px;*/
    }

    &:hover {
      background: lightblue;
    }
  }

  .disabled-dropbox {
    background: lightgray;

    &:hover {
      background: lightgray;
      cursor: not-allowed;
    }

    input {
      cursor: not-allowed;
    }
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 75%;
    height: 65%;
    /*height: 138px;*/
    position: absolute;
    cursor: pointer;
  }

</style>


