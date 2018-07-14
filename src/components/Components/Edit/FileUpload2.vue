<template>
  <div class="content">
    <!--UPLOAD-->
    <form enctype="multipart/form-data"
          novalidate v-if="isInitial || isSaving">
      <div class="label">Image</div>
      <div class="dropbox">
        <input type="file" multiple
               :name="uploadFieldName"
               :disabled="isSaving"
               @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
               accept="image/*"
               class="input-file">
        <p v-if="isInitial">
          Glissez une image ici<br> ou cliquez pour naviguer votre disque.
        </p>
        <p class="TEXT" v-if="isSaving">
          {{ fileCount }} en cours d'upload ...
        </p>
      </div>
    </form>

    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2 class="TEXT" >{{ uploadedFiles.length }} fichier(s) uploadés avec succès.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Nouvel upload.</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img :src="item.url" class="img-responsive img-thumbnail"
               :alt="item.originalName">
        </li>
      </ul>
    </div>

    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Echec.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Reessayer</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>

  </div>
</template>

<script>
  import {upload} from './FileUploadService';

  const STATUS_INITIAL = 0;
  const STATUS_SAVING = 1;
  const STATUS_SUCCESS = 2;
  const STATUS_FAILED = 3;

  export default {
    name: 'FileUpload',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      };
    },
    computed: {
      isInitial() {
        // this.debugg();
        // console.log('\n'+'isInitial')
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        // this.debugg();
        // console.log('\n'+'isSaving')
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        // this.debugg();
        // console.log('\n'+'isSuccess')
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        // this.debugg();
        // console.log('\n'+'isFailed')
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {

      debugg() {
        console.log(this.uploadedFiles);
        console.log(this.uploadError);
        console.log(this.currentStatus);
        console.log(this.uploadFieldName);
      },

      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        }).catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

        // save it
        this.save(formData);
      }
    },
    mounted() {
      this.reset();
    },
  };

</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .TEXT {
    color: white;
  }

  a {
    color: #ffbabf;

    &:hover {
      color: white;
    }
  }

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
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 50%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
