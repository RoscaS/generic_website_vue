<template>
  <div>
    <BaseLayout :id="$options.name"
                :title="state.title.data"
                :subTi="state.subTi.data"
                :state="state" :activeTab="activeTab"
                :loading="loading"
                @changeTab="activeTab=$event">
      <EditIcon :component="$options.name" editMenu="image"/>
      <EventsImages/>
    </BaseLayout>
  </div>

</template>

<script>
  import mixin from '../../mixins/Public/PublicMixin';
  import EventsTextsStore from './EventsTextsStore';
  import EventsImages from './EventsImages';
  import EditIcon from '../../components/Edit/EditIcon';

  export default {
    name: "Events",
    mixins: [mixin],
    components: {EventsImages, EditIcon},
    data() {
      return {
        store: EventsTextsStore,
        state: {
          title: new this.Title(),
          subTi: new this.SubTitle(),
        },
        baseHeight: null,

      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';


</style>
