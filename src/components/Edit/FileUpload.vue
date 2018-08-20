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
  import GalleriesStore from './Galleries/GalleriesStore';

  export default {
    name: "FileUpload",
    props: {
      store: {type: Object},
    },
    data() {
      return {
        edit: GalleriesStore,
      };
    },
    computed: {
      loading() { return this.edit.loading; },
    },
    methods: {
      fileUpload() {
        this.edit.uploadImage(this.buildForm(), this.store);
      },
      buildForm() {
        let file = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('name', 'upploaded');
        formData.append('image', file);
        formData.append('gallery', this.store.name);
        return formData;
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
    border-radius: 10px;

    &.mobile {
      margin-top: 20px;
    }

    p {
      font-size: 1.2em;
      text-align: center;
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
    position: absolute;
    cursor: pointer;
  }

</style>


