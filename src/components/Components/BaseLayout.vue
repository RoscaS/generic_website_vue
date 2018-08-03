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

      <div class="container">
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>

      <slot name="gallery-content" v-if="$parent.name=='Gallery'"></slot>

    </section>
    <EditNav v-if="checkName()" :height="editNavHeight" >
      <slot name="edit-nav"></slot>
    </EditNav>
  </div>
</template>

<script>
  import EditIcon from '../../components/Components/Edit/EditIcon';
  import EditNav from '../../components/Components/Edit/EditNav';

  export default {
    name: "BaseLayout",
    props: {
      id: {Type: String},
      title: {Type: String},
      subTi: {Type: String},
      editNavHeight: {type: String, default: '225'}
    },
    components: {EditIcon, EditNav},
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
  @import '../../../static/sass/global';

</style>
