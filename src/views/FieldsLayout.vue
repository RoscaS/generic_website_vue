<template>
  <b-tabs v-model="currentTab" position="is-centered" slot="edit-nav">
    <b-tab-item v-for="(i, idx) in state" :key="idx" :label="i.label">
      <b-field v-if="i.label !=='Image'" type="is-light">
        <b-input :type="i.type" :maxlength="i.len" :rows="i.rows"
                 :disabled="loading" v-model="i.data">
        </b-input>
      </b-field>
      <FileUpload v-else @image-preview="state.image.data=$event"></FileUpload>
    </b-tab-item>
    <slot></slot>
  </b-tabs>
</template>

<script>
  import FileUpload from '../components/Edit/FileUpload';

  export default {
    name: "FieldsLayout",
    components: {FileUpload},
    props: {
      state: {type: Object},
      activeTab: {type: Number},
      loading: {type: Boolean}
    },
    computed: {
      currentTab: {
        get() { return this.activeTab; },
        set(value) {
          this.$emit('changeTab', value);
        }
      }
    },
    mounted() {
      this.currentTab = this.activeTab;
    }
  };
</script>

<style scoped>

</style>
