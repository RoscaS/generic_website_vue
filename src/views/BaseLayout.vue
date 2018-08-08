<template>
  <div>
    <section :id="id" class="section section-container">
      <EditIcon :component="$parent.$options.name"/>
      <div class="container">
        <div class="content">
          <Title :class="{'highlighted': $parent.highlighted(0)}"
                 v-scroll-reveal="$parent.sReveal('top', 150, 30)">
            {{ title }}
          </Title>
          <p class="sub-title"
             :class="{'highlighted': $parent.highlighted(1)}"
             v-scroll-reveal="$parent.sReveal('bottom', 200, 10, 3000)">
            {{ subTi }}
          </p>
        </div>
      </div>

      <slot v-if="$parent.$options.name=='Events'"></slot>

      <div class="container" v-else>
        <div class="content">
          <slot></slot>
        </div>
      </div>

    </section>
    <EditNav v-if="$parent.checkComponent()" :height="editNavHeight">
      <FieldsLayout :state="state" :activeTab="activeTab" :loading="loading"
                    @changeTab="$emit('changeTab', $event)">
        <slot name="moreFields"></slot>
      </FieldsLayout>
    </EditNav>
  </div>
</template>

<script>
  import EditIcon from '../components/Edit/EditIcon';
  import EditNav from '../components/Edit/Texts/TextsEditMenu';
  import FieldsLayout from './FieldsLayout.vue';

  export default {
    name: "BaseLayout",
    props: {
      id: {Type: String},
      title: {Type: String},
      subTi: {Type: String},
      state: {type: Object},
      activeTab: {type: Number},
      loading: {type: Boolean},
      editNavHeight: {type: String, default: '225'}
    },
    components: {EditIcon, EditNav, FieldsLayout},
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

</style>
