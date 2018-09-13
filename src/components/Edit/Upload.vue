<template>
  <b-field>
    <div class="level">
      <div class="level-item drop-zone">
        <b-upload v-model="dropFiles"
                  :accept="accept"
                  drag-drop>
          <div class="content has-text-centered" :style="setStyle">
            <b-icon
              icon="upload"
              size="is-large">
            </b-icon>
            <p>Glissez ou cliquez pour <br> charger une image.</p>
          </div>
        </b-upload>
      </div>
    </div>
  </b-field>
</template>

<script>
export default {
  name: "Upload",
  props: {
    padding: { type: String, default: "10px" }
  },
  data: () => ({
    dropFiles: [],
    accept: "image/*"
  }),
  computed: {
    setStyle() {
      return { padding: this.padding };
    }
  },
  watch: {
    dropFiles(value) {
      this.$emit("file", value[0]);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.drop-zone {
  .content {
  }
}
</style>
