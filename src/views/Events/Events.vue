<template>
  <div>
    <BaseLayout :store="store">
      <EditIcon :store="imagesStore" :edit="imagesEdit"/>
      <EventsImages/>
    </BaseLayout>
  </div>

</template>

<script>
  import ViewsMixin from '../../mixins/ViewsMixin';
  import EventsImages from './EventsImages';
  import GalleriesStore from '../../components/Edit/Galleries/GGalleriesStore';
  import EditIcon from '../../components/Edit/EditIcon';


  export default {
    name: "Events",
    mixins: [ViewsMixin],
    components: {EventsImages, EditIcon},
    data() {
      return {
        component: 'Events',
        type: 'text',
      };
    },
    computed: {
      imagesEdit() { return GalleriesStore },
      imagesStore() { return GalleriesStore.getGallery('Events')},
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';
</style>
