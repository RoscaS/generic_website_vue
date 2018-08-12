<template>
  <b-tabs v-model="edit.activeTab" position="is-centered" slot="edit-nav">
    <b-tab-item v-for="(i, idx) in store.state" :key="idx" :label="i.label">
      <b-field v-if="i.label !=='Image'"
               type="is-light">
        <b-input :type="i.type"
                 :maxlength="i.len"
                 :rows="i.rows"
                 :disabled="edit.loading"
                 v-model="i.data">
        </b-input>
      </b-field>
      <FileUpload v-else :edit="edit"
                  @image-preview="i.data.image=$event.image"/>
    </b-tab-item>
    <slot></slot>
  </b-tabs>
</template>

<script>
  import FileUpload from '../components/Edit/FileUpload';
  import TextsEditStore from '../components/Edit/Texts/TTextsEditStore';

  export default {
    name: "FieldsLayout",
    components: {FileUpload},
    props: {
      store: {type: Object},
    },
    computed: {
      edit() { return TextsEditStore; },
      currentTab: {
        get() { return this.edit.activeTab; },
        set(value) {
          this.$emit('changeTab', value);
        }
      }
    },
  };
</script>

<style scoped>

</style>
