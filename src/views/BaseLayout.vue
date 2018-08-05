<template>
  <div>
    <section :id="id" class="section section-container">
      <EditIcon :component="$parent.name">

        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': highlighted(0)}"
                   v-scroll-reveal="sReveal('top', 150, 30)">
              {{ title }}
            </Title>
            <p class="sub-title"
               :class="{'highlighted': highlighted(1)}"
               v-scroll-reveal="sReveal('bottom', 200, 10, duration=3000)">
              {{ subTi }}
            </p>
          </div>
        </div>
      </EditIcon>

      <slot v-if="$parent.name=='Gallery'"></slot>

      <div class="container" v-else>
        <div class="content">
          <slot></slot>
        </div>
      </div>

    </section>
    <EditNav v-if="checkName()" :height="editNavHeight">
      <FieldsLayout :state="state" :activeTab="activeTab" :loading="loading"
                      @changeTab="$emit('changeTab', $event)">
        <slot name="moreFields"></slot>
      </FieldsLayout>
    </EditNav>
  </div>
</template>

<script>
  import EditIcon from '../components/Edit/EditIcon';
  import EditNav from '../components/Edit/EditNav';
  import FieldsLayout from './FieldsLayout.vue'


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
    methods: {
      sReveal(side, delay, distance, duration) {
        return this.$parent.sReveal(side, delay, distance, duration)
      },
      highlighted(idx) {
        return this.$parent.highlighted(idx);
      },
      checkName() {
        return this.$parent.checkName();
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

</style>
