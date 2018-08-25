<template>
  <b-field>
  <div class="drop-zone" :style="{borderColor: color}">
    <b-upload v-model="dropFiles"
              drag-drop>
      <section class="section">
        <div class="content has-text-centered">
          <b-icon
            icon="upload"
            size="is-large">
          </b-icon>
          <p>Glissez ou cliquez pour charger une image.</p>
        </div>
      </section>
    </b-upload>
  </div>
  </b-field>
</template>

<script>
  export default {
    name: "Upload",
    props: {
      color: {type: String, default: '#167DF0'}
    },
    data: () => ({
      dropFiles: [],
    }),

    watch: {
      dropFiles(value) {
        this.$emit('file', value[0])
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .drop-zone {
    border: 2px dashed;

    .section {
      padding-top: 20px;
      .content {
        height: 70px;
      }
    }
  }


</style>
