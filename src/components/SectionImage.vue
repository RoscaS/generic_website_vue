<template>
  <div>
    <EditIcon :top="top"
              :right="right"
              :edit="edit"
              :store="store"
              :small="true">
    </EditIcon>
    <img :src="image"/>
  </div>
</template>

<script>
import EditIcon from "./Edit/EditIcon";

export default {
  name: "SectionImage",
  components: { EditIcon },
  props: {
    top: { type: String },
    right: { type: String },
    image: { type: String },
    store: { type: Object },
    edit: { type: Object },
    mobile: {}
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global";

img {
  padding: 10px;
  border-radius: 20px;
  object-fit: cover;
  width: 100%;
  max-width: 442px;
  height: auto;
}
</style>
