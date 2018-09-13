<template>
  <div>
    <section class="section section-container">
      <EditIcon :store="store" :edit="edit"/>
      <div class="container">
        <div class="content">
          <div v-scroll-reveal="$parent.sReveal('top', 150, 30)">
            <Title :class="{'highlighted': $parent.highlighted(0)}">
              {{ store.state.title.data }}
            </Title>
          </div>
          <div>

          </div>
          <div v-scroll-reveal="$parent.sReveal('bottom', 200, 10, 3000)">
            <p class="sub-title"
               :class="{'highlighted': $parent.highlighted(1)}">
              {{ store.state.sub_title.data }}
            </p>
          </div>
        </div>
      </div>

      <slot v-if="store.name ==='Events'"></slot>

      <div class="container" v-else>
        <div class="content">
          <slot></slot>
          <slot name="outsite"></slot>
        </div>
      </div>

    </section>

    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <SectionsEditMenu v-if="$parent.checkComponent()">
        <FieldsLayout :store="store">
          <slot name="moreFields"></slot>
        </FieldsLayout>
      </SectionsEditMenu>
    </transition>
  </div>
</template>

<script>
import Title from "../../components/Title";
import EditIcon from "../../components/Edit/EditIcon";
import SectionsStore from "../../components/Edit/Texts/SectionsStore";
import FieldsLayout from "./FieldsLayout.vue";
import SectionsEditMenu from "../../components/Edit/Texts/SectionsEditMenu";

export default {
  name: "BaseLayout",
  props: {
    store: { type: Object }
  },
  components: { Title, EditIcon, SectionsEditMenu, FieldsLayout },
  computed: {
    edit() {
      return SectionsStore;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";
</style>
