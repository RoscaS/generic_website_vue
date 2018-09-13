<template>
  <!--<section class="section section-container">-->
    <!--<div class="container">-->
      <!--<Title>Generic Sections</Title>-->

      <!--<div class="">-->
        <!--<b-tabs position="is-centered" class="block" v-model="activeTab">-->
          <!--<b-tab-item v-for="(section, i) in sections" :key="i"-->
                      <!--:label="section.name">-->
            <!--<div class="content">-->
              <!--{{ section.state.title.data }}-->
            <!--</div>-->
          <!--</b-tab-item>-->
        <!--</b-tabs>-->
      <!--</div>-->

    <!--</div>-->
  <!--</section>-->
</template>

<script>
  import Title from '../../components/Title';
  import SectionsEditMenu from '../../components/Edit/Texts/SectionsEditMenu';
  import FieldsLayout from '../Layouts/FieldsLayout';
  import EditIcon from '../../components/Edit/EditIcon';
  import SectionsStore from '../../components/Edit/Texts/SectionsStore';

  export default {

    name: 'GenericSections',
    components: {EditIcon, FieldsLayout, SectionsEditMenu, Title},
    data: () => ({
      activeTab: 0,
    }),
    computed: {
      edit() {return SectionsStore;},
      sections() {return this.edit.genericStors;},
    },
    mounted() {
      setTimeout(() => {
        console.log(this.edit.genericStors);
      }, 500);
    },
  };
</script>

<style scoped lang="scss">
  @import "../../scss/global";





</style>
