<template>
  <div class="gallery-wrapper">
    <section id="Galerie" class="section section-container">

      <EditIcon Top="20px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': menu[activeTab].name=='Titre'}">
              {{ title }}
            </Title>

            <p class="sub-title"
               :class="{'highlighted': menu[activeTab].name=='Sous titre'}">
              {{ subTitle }}
            </p>
          </div>
        </div>


        <transition name="fade" mode="out-in">
          <GalleryManager v-if="editGalery">
          </GalleryManager>
          <GalleryUser v-else></GalleryUser>
        </transition>


      </EditIcon>
    </section>

    <EditNav id="GalleryEditNav" v-if="editPannel.check($options.name)">

      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item class="_tab-content" label="Titre">
          <b-input v-show="menu.find(i=>i.name=='Titre').display"
                   maxlength="35"
                   :disabled="loading"
                   v-model="title">
          </b-input>
        </b-tab-item>

        <b-tab-item class="_tab-content" label="Sous titre">
          <b-input v-show="menu.find(i=>i.name=='Sous titre').display"
                   type="textarea"
                   maxlength="500"
                   rows="3"
                   :disabled="loading"
                   v-model="subTitle">
          </b-input>
        </b-tab-item>

        <h1 class="header title" v-show=""> POULETTE </h1>

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

        editPannel: this.$Global.EditPannel,
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

      editGalery() {
        let el = document.getElementById('GalleryEditNav');
        let test = this.menu.find(i => i.name == 'Galerie').display &&
          this.$Global.EditPannel.component == 'Gallery';

        if (test) {
          setTimeout(() => {Velocity(el, {minHeight: 'auto'}, 1500);}, 250);
        }
        else {
          setTimeout(() => {Velocity(el, {minHeight: '331px'}, 1500);}, 10);
          this.menu.find(i => i.name == 'Galerie').display = false;
        }
        return test;
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
