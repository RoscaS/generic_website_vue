<template>
  <div class="gallery-wrapper">
    <BaseLayout id="Galerie" :title="state.title.data"
                :subTi="state.subTi.data" edit-nav-height="150">
      <template slot="gallery-content">
        <transition name="fade" mode="out-in">
          <GalleryManager v-if="activeTab==2 && edit.component==name"/>
          <GalleryUser v-else/>
        </transition>
      </template>

      <b-tabs v-model="activeTab" position="is-centered" slot="edit-nav">
        <b-tab-item v-for="(i, idx) in state" :key="idx" :label="i.label">
          <b-field type="is-light">
            <b-input :type="i.type"
                     :maxlength="i.len"
                     :rows="i.rows"
                     :disabled="loading"
                     v-model="i.data">
            </b-input>
          </b-field>
        </b-tab-item>

        <b-tab-item label="Galerie">
          <div class="level">
            <div class="level-left">
              <button class="button is-info level-item"
                      @click="reOrder=true">Reset
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
      </b-tabs>

    </BaseLayout>
  </div>
</template>

<script>
  import GalleryStore from './GalleryStore';
  import mixin from '../../../mixins/Public/PublicMixin'
  import GalleryUser from './GalleryUser/GalleryUser';
  import GalleryManager from './GalleryEdit/GalleryEdit';

  export default {
    name: "Gallery",
    mixins: [mixin],
    components: {GalleryUser, GalleryManager},
    data() {
      return {
        store: GalleryStore,
        state: {
          title: {data: '', len: '35', label: 'Titre',},
          subTi: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre',},
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
