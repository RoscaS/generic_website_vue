<template>
  <div class="gallery-wrapper">
    <section id="Galerie" class="section section-container">
      <EditIcon top="20px" :component="$options.name">
        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': highlighted(0)}">
              {{ title }}
            </Title>

            <p class="sub-title"
               :class="{'highlighted': highlighted(1)}">
              {{ subTi }}
            </p>
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <GalleryManager v-if="activeTab==2 && edit.component==name"/>
          <GalleryUser v-else/>
        </transition>

      </EditIcon>
    </section>

    <EditNav id="GalleryEditNav" v-if="checkName()" height="150">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Titre">
          <b-input maxlength="35"
                   :disabled="loading"
                   v-model="title">
          </b-input>
        </b-tab-item>
        <b-tab-item label="Sous titre">
          <b-input maxlength="200"
                   rows="3"
                   :disabled="loading"
                   v-model="subTi">
          </b-input>
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
    </EditNav>
  </div>
</template>

<script>
  import GalleryMainStore from './GalleryMainStore';
  import mixin from '../../../mixins/PublicMixin'
  import GalleryUser from './GalleryUser/GalleryUser';
  import GalleryManager from './GalleryEdit/GalleryEdit';

  export default {
    name: "Gallery",
    mixins: [mixin],
    components: {GalleryUser, GalleryManager},
    data() {
      return {
        store: GalleryMainStore,
        state: GalleryMainStore.state,
        baseHeight: null,

      };
    },
    computed: {
      reOrder: {
        get() { return this.edit.reOrder; },
        set(value) { this.edit.reOrder = value}
      },
      title: {
        get() { return this.state.title; },
        set(value) { this.state.title = value; }
      },
      subTi: {
        get() { return this.state.subTi; },
        set(value) { this.state.subTi = value; }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .gallery-wrapper {
    min-height: 597px;
  }

</style>
