<template>
  <div>
    <div class="container collapse-content">

      <EditIcon :component="name">
        <div class="columns content">
          <div class="column left is-offset-2 is-4">
            <img :class="{'highlighted': highlighted(2)}"
                 :src="state.image">
          </div>
          <div class="column right is-5">
            <div>
              <h3 :class="{'highlighted': highlighted(0)}">
                {{ state.title }}
              </h3>
              <p :class="{'highlighted': highlighted(1)}">
                {{ state.text }}
              </p>
            </div>
          </div>
        </div>
      </EditIcon>
    </div>
    <EditNav v-if="checkName()">
      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item label="Image">
          <FileUpload @image-preview="image=$event"></FileUpload>
        </b-tab-item>

        <b-tab-item label="Titre">
          <b-input maxlength="35"
                   :disabled="loading"
                   v-model="state.title">
          </b-input>
        </b-tab-item>
        <b-tab-item label="Texte">
          <b-input type="textarea"
                   maxlength="500"
                   rows="5"
                   :disabled="loading"
                   v-model="state.text">
          </b-input>
        </b-tab-item>
      </b-tabs>
    </EditNav>
  </div>
</template>

<script>
  import PromoStore from './PromoStore';
  import mixin from '../../../mixins/PublicMixin'

  export default {
    name: 'Promo',
    mixins: [mixin],
    data() {
      return {
        store: PromoStore,
        state: {title: '', text: '', image: '',},
      };
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
