<template>
  <div class="gallery-wrapper">
    <section id="Galerie" class="section section-container">

      <EditIcon Top="20px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': activeTab==0&&edit.component==name}">
              {{ title }}
            </Title>

            <p class="sub-title"
               :class="{'highlighted': activeTab==1&&edit.component==name}">
              {{ subTitle }}
            </p>
          </div>
        </div>


        <transition name="fade" mode="out-in">
          <GalleryManager v-if="editGalery"/>
          <GalleryUser v-else/>
        </transition>


      </EditIcon>
    </section>

    <EditNav id="GalleryEditNav" v-if="edit.check($options.name)" height="150">

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
                   v-model="subTitle">
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
  import store from './GalleryStore';
  import {mapGetters, mapActions} from 'vuex';

  import GalleryUser from './GalleryUser';
  import GalleryManager from '../GalleryManager/GalleryManager';

  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';

  export default {
    name: "Gallery",
    components: {GalleryUser, GalleryManager, EditIcon, EditNav},
    store: store,

    data() {
      return {
        activeTab: 0,
        name: this.$options.name,
        baseHeight: null,
        edit: this.$Global.EditPannel,
        // reOrder: this.$Global.EditPannel.reOrder,
        menu: [
          {display: true, name: 'Titre',},
          {display: false, name: 'Sous titre',},
          {display: false, name: 'Galerie',},
        ],
      };
    },
    computed: {
      ...mapGetters([
        'galTitle',
        'galSubTitle',
      ]),

      reOrder: {
        get() { return this.$Global.EditPannel.reOrder; },
        set(value) { this.$Global.EditPannel.reOrder = value}
      },

      editGalery() {
        return this.activeTab == 2 && this.edit.component == this.name;
      },

      loading: {
        get() { return this.LoadingFlag; },
      },

      title: {
        get() { return this.galTitle; },
        set(value) {
          this.setTitle(value);
          this.toggleDirty();
        }
      },

      subTitle: {
        get() { return this.galSubTitle; },
        set(value) {
          this.setSubTitle(value);
          this.toggleDirty();
        }
      },
    },

    watch: {
      title(value) { this.setTitle(value); },
      subTitle(value) { this.setSubTitle(value); },
    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'recoverData',
        'setTitle',
        'setSubTitle',
        'toggleDirty',
      ]),
    },

    mounted() {
      this.fetchData();
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .gallery-wrapper {
    min-height: 597px;
  }

</style>
