<template>
  <div>
    <div class="container collapse-content">

      <EditIcon :component="name">
        <div class="columns content">
          <div class="column left is-offset-2 is-4">
            <img :class="{'highlighted': highlighted(2)}"
                 :src="image">
          </div>
          <div class="column right is-5">
            <div>
              <h3 :class="{'highlighted': highlighted(0)}">
                {{ title }}
              </h3>
              <p :class="{'highlighted': highlighted(1)}">
                {{ text }}
              </p>
            </div>
          </div>
        </div>
      </EditIcon>
    </div>
    <EditNav v-if="edit.component==name">
      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item label="Image">
          <FileUpload @image-preview="image=$event"></FileUpload>
        </b-tab-item>

        <b-tab-item label="Titre">
          <b-input maxlength="35"
                   :disabled="loading"
                   v-model="title">
          </b-input>
        </b-tab-item>
        <b-tab-item label="Texte">
          <b-input type="textarea"
                   maxlength="500"
                   rows="4"
                   :disabled="loading"
                   v-model="text">
          </b-input>
        </b-tab-item>
      </b-tabs>
    </EditNav>
  </div>
</template>

<script>
  import PromoStore from './PromoStore';
  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';
  import FileUpload from '../../Components/Edit/FileUpload';

  export default {
    name: 'Promo',
    components: {EditIcon, EditNav, FileUpload},
    data() {
      return {
        name: this.$options.name,
        edit: this.$Global.EditPannel,
        store: PromoStore,
        state: PromoStore.state,
        activeTab: 0,
      };
    },

    computed: {
      loading() { return this.edit.loading; },
      pushSignal() { return this.edit.pushSignal; },
      recoverSignal() { return this.edit.recoverSignal; },

      title: {
        get() { return this.state.title; },
        set(value) { this.state.title = value; }
      },

      text: {
        get() { return this.state.text; },
        set(value) { this.state.text2 = value; }
      },
      image: {
        get() { return this.state.image; },
        set(value) {this.state.image = value; }
      },
    },

    watch: {
      recoverSignal() {
        if (this.checkSignal(this.edit.recoverSignal)) this.recoverData();
      },
      pushSignal() {
        if (this.checkSignal(this.edit.pushSignal)) this.pushData();
      },
    },

    methods: {
      pushData() { PromoStore.pushData(); },
      recoverData() { PromoStore.recoverData(); },
      checkName() { return this.edit.component === this.name;},
      highlighted(idx) { return (this.activeTab == idx) && this.checkName(); },
      checkSignal(sig) { return sig && this.checkName(); },
    },

    mounted() {
      PromoStore.fetchData();
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .edit-area {
    .label {
      color: white;
    }
  }

  .container {
    height: 400px;
    margin-top: 150px;

    @media screen and (max-width: 768px) {
      height: 800px;

      .column {
        display: flex;
        justify-content: center;
        align-items: center;

        h2 {
          display: block;
        }

        p {
          display: block;
        }
      }
    }

    img {
      width: 400px;
      margin-top: 30px;
    }

    .right {
      padding: 40px;
      @media screen and (max-width: 768px) {
        padding: 80px;
      }
    }
  }
</style>
