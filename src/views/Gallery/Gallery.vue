<template>
<div>
  <BaseLayout :id="$options.name"
              :title="state.title.data"
              :subTi="state.subTi.data"
              :state="state" :activeTab="activeTab"
              :loading="loading"
              @changeTab="activeTab=$event">
    <!--<transition name="fade" mode="out-in">-->
      <!--<GalleryManager v-if="activeTab==2 && edit.component==name"/>-->
    <GalleriesEditIcon :component="$options.name"/>
      <GalleryImages></GalleryImages>
    <!--</transition>-->


    <!--<template slot="moreFields">-->
      <!--<b-tab-item label="Galerie">-->
        <!--<div class="level">-->
          <!--<div class="level-left">-->
            <!--<button class="button is-info level-item" @click="reOrder=true">-->
              <!--Reset-->
            <!--</button>-->
            <!--&lt;!&ndash;<b-checkbox class="level-item" type="is-info"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="editable">Drag and drop&ndash;&gt;-->
            <!--&lt;!&ndash;</b-checkbox>&ndash;&gt;-->
            <!--&lt;!&ndash;<b-checkbox class="level-item" type="is-info"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="hiddenGallery">Stock&ndash;&gt;-->
            <!--&lt;!&ndash;</b-checkbox>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
      <!--</b-tab-item>-->
    <!--</template>-->

  </BaseLayout>
</div>

</template>

<script>
  import GalleryTextsStore from './GalleryTextsStore';
  import mixin from '../../mixins/Public/PublicMixin'
  import GalleryImages from './GalleryImages';
  import GalleryManager from './GalleryEdit';

  import GalleriesEditIcon from '../../components/Edit/Galleries/GalleriesEditIcon';



  export default {
    name: "Gallery",
    mixins: [mixin],
    components: {GalleryImages, GalleryManager, GalleriesEditIcon},
    data() {
      return {
        store: GalleryTextsStore,
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
