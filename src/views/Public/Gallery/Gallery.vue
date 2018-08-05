<template>
  <div class="gallery-wrapper">
    <BaseLayout :id="name"
                :title="state.title.data"
                :subTi="state.subTi.data"
                :state="state" :activeTab="activeTab"
                :loading="loading"
                @changeTab="activeTab=$event">
      <transition name="fade" mode="out-in">
        <GalleryManager v-if="activeTab==2 && edit.component==name"/>
        <GalleryImages v-else/>
      </transition>


      <template slot="moreFields">
        <b-tab-item label="Galerie">
          <div class="level">
            <div class="level-left">
              <button class="button is-info level-item" @click="reOrder=true">
                Reset
              </button>
              <!--<b-checkbox class="level-item" type="is-info"-->
              <!--v-model="editable">Drag and drop-->
              <!--</b-checkbox>-->
              <!--<b-checkbox class="level-item" type="is-info"-->
              <!--v-model="hiddenGallery">Stock-->
              <!--</b-checkbox>-->
            </div>
          </div>
        </b-tab-item>
      </template>

    </BaseLayout>
  </div>
</template>

<script>
  import GalleryTextsStore from './GalleryTextsStore';
  import mixin from '../../../mixins/Public/PublicMixin'
  import GalleryImages from './GalleryImages';
  import GalleryManager from './GalleryEdit';

  export default {
    name: "Gallery",
    mixins: [mixin],
    components: {GalleryImages, GalleryManager},
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
  @import '../../../../static/sass/global';

  .gallery-wrapper {
    min-height: 597px;
  }

</style>
