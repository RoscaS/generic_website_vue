<template>
  <div>
    <section id="Galerie" class="section section-container">

      <EditIcon Top="20px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="container">
          <div class="content">
            <Highlighted sub="Titre" :menu="menu" :name="name">
              <Title>{{ title }}</Title>

              <button class="button is-warning" @click="isAdmin= !isAdmin">
                Admin
              </button>

            </Highlighted>
            <Highlighted sub="Sous titre" :menu="menu" :name="name">
              <p class="sub-title">{{ subTitle }}</p>
            </Highlighted>
          </div>
        </div>


        <transition name="fade" mode="out-in">
          <GalleryManager v-if="isAdmin"></GalleryManager>
          <!--</InOut>-->

          <!--<InOut type="fade" enter="Right" leave="Right">-->
          <GalleryUser v-else></GalleryUser>
          <!--</InOut>-->
        </transition>


        <!--</div>-->
  <!--</div>-->

  </EditIcon>
  </section>

  <EditNav v-if="editPannel.check($options.name)">

    <div class="column is-2 is-offset-3 edit-area">
      <ul class="editLink">
        <li v-for="i in menu">
          <a class="no-tr"
             :class="{'selected': editPannel.getSelected(i.name, menu).display}"
             @click="editPannel.editMenu(i, menu)">
            {{ i.name }}
          </a>
        </li>
      </ul>
    </div>


    <div class="column is-3 edit-area">
      <b-input v-show="editPannel.getSelected('Titre', menu).display"
               maxlength="35"
               :disabled="loading"
               v-model="title">
      </b-input>
      <b-input v-show="editPannel.getSelected('Sous titre', menu).display"
               type="textarea"
               maxlength="500"
               rows="7"
               :disabled="loading"
               v-model="subTitle">
      </b-input>
    </div>
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
        name: this.$options.name,
        isAdmin: true,

        editPannel: this.$Global.EditPannel,
        menu: [
          {display: false, name: 'Titre',},
          {display: false, name: 'Sous titre',},
        ],
      };
    },
    computed: {
      ...mapGetters([
        'galTitle',
        'galSubTitle',
      ]),

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

</style>
