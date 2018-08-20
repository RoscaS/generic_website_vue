<template>
  <b-tabs v-model="edit.state.activeTab" position="is-centered" slot="edit-nav">
    <b-tab-item v-for="(i, idx) in fieldList" :key="idx" :label="i.label">
      <b-field v-if="i.label !=='Image'"
               type="is-light">
        <b-input :type="i.type"
                 :maxlength="i.len"
                 :rows="i.rows"
                 :disabled="edit.loading"
                 v-model="i.data">
        </b-input>
      </b-field>
      <FileUpload v-else :edit="edit" :gallery="store.name"
                  @image-preview="i.data.image=$event.image"/>
    </b-tab-item>
    <slot></slot>
  </b-tabs>
</template>

<script>
  import FileUpload from '../../components/Edit/FileUpload';
  import TextsStore from '../../components/Edit/Texts/TextsStore';

  export default {
    name: "FieldsLayout",
    components: {FileUpload},
    props: {
      store: {type: Object},
    },
    computed: {
      fieldList() {
        if (this.store.name == 'Review') {
          return {
            title: this.store.state.title,
            sub_title: this.store.state.sub_title,
          };
        }
        return this.store.state;
      },


      edit() { return TextsStore; },
      currentTab: {
        get() { return this.edit.state.activeTab; },
        set(value) {
          this.$emit('changeTab', value);
        }
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

</style>
