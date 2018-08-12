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
  import GalleriesEditStore from '../../components/Edit/Galleries/GalleriesEditStore';
  import EditIcon from '../../components/Edit/EditIcon';


  export default {
    name: "Events",
    mixins: [ViewsMixin],
    components: {EventsImages, EditIcon},
    data() {
      return {
        component: 'Events',
        type: 'text',
        imagesEdit: GalleriesEditStore,
        imagesStore: GalleriesEditStore.getStore('Events'),
      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';
</style>
