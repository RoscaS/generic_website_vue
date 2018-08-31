<template>
  <div>
    <BaseLayout :store="store">
      <EditIcon :store="imagesStore" :edit="imagesEdit"/>
      <EventsGallery></EventsGallery>
    </BaseLayout>
  </div>

</template>

<script>
  import ViewsMixin from '../../mixins/ViewsMixin';
  import EventsGallery from './EventsGallery';
  import EditIcon from '../../components/Edit/EditIcon';


  export default {
    name: "Events",
    mixins: [ViewsMixin],
    components: {EventsGallery, EditIcon},
    data() {
      return {
        component: 'Events',
        type: 'text',
      };
    },
    computed: {
      imagesEdit() { return this.galleriesEdit },
      imagesStore() { return this.galleriesEdit.getStore('Events')},
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';
</style>
