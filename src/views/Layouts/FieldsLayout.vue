<template>
  <b-tabs v-model="edit.state.activeTab" position="is-centered" slot="edit-nav">
    <b-tab-item v-for="(i, idx) in fieldList" :key="idx" :label="i.label">

      <b-field v-if="i.label !=='Image'">
        <b-input :type="i.type"
                 :maxlength="i.len"
                 :rows="i.rows"
                 :disabled="edit.loading"
                 v-model="i.data">
        </b-input>
      </b-field>

    </b-tab-item>
    <slot></slot>
  </b-tabs>
</template>

<script>
import TextsStore from "../../components/Edit/Texts/TextsStore";

export default {
  name: "FieldsLayout",
  props: {
    store: { type: Object }
  },
  computed: {
    edit() {
      return TextsStore;
    },
    fieldList() {
      if (this.store.name == "Review") {
        return {
          title: this.store.state.title,
          sub_title: this.store.state.sub_title
        };
      }
      return this.store.state;
    }
  }
};
</script>
