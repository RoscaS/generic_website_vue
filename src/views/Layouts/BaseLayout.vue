<template>
  <div>
    <section :id="store.related" class="section section-container">
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

      <slot v-if="store.related =='Events'"></slot>

      <div class="container" v-else>
        <div class="content">
          <slot></slot>
        </div>
      </div>

    </section>
    <TextsEditMenu v-if="$parent.checkComponent()" :height="editNavHeight">
      <FieldsLayout :store="store">
        <slot name="moreFields"></slot>
      </FieldsLayout>
    </TextsEditMenu>
  </div>
</template>

<script>
  import EditIcon from '../../components/Edit/EditIcon';
  import TextsEditMenu from '../../components/Edit/Texts/TextsEditMenu';
  import FieldsLayout from './FieldsLayout.vue';
  import TextsEditStore from '../../components/Edit/Texts/TextsEditStore';

  export default {
    name: "BaseLayout",
    props: {
      store: {type: Object},
      editNavHeight: {type: String, default: '225'}
    },
    components: {EditIcon, TextsEditMenu, FieldsLayout},
    computed: {
      edit() { return TextsEditStore; },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

</style>
