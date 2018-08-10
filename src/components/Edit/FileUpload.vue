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
      store: {type: Object},
      edit: {type: Object},
    },
    data() {
      return {
        c: 0,
      };
    },

    computed: {
      loading() { return this.edit.loading; },
    },

    methods: {
      fileUpload() {
        this.edit.loading = true;
        axios.post(url, this.buildForm(), {
          headers: {'content-type': 'multipart/form-data'},
        }).then(response => {
          // ajouter response en argument de commitG() et uniquement
          // push dans le store ce qui est ajouté à la place de regen
          // la liste complète.
          setTimeout(() => {
            if (this.gallery !== '_temp') this.commitGallery();
            else this.commitText(response);
            this.edit.loading = false;
          }, 2000);

        }).catch(error => {
          this.$toast.open({
            duration: 4000,
            message: '.jpg ou .png uniquement!',
            type: 'is-danger'
          });
          console.log(error);
        });
      },

      buildForm() {
        let file = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('image', file);
        formData.append('gallery', this.gallery);
        return formData;
      },

      commitGallery() {
        this.store.fetchData();
        this.$Global.Tools.message(3);
        setTimeout(() => {
          this.edit.activeTab = 0;
        }, 500);
      },

      commitText(response) {
        this.$emit('image-preview', response.data);
        this.edit.setDirty(true);
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
    outline: 2px dashed grey; // the dash box
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
    opacity: 0; // invisible but it's there!
    width: 75%;
    height: 65%;
    /*height: 138px;*/
    position: absolute;
    cursor: pointer;
  }

</style>


