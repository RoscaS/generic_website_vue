<template>
  <div>
    <div class="container">
      <EditIcon :store="store" :edit="edit"/>
      <div class="columns content">
        <div class="column left is-offset-2 is-4">
          <div>
            <EditIcon :edit="galleriesEdit" :store="store.gallery"
                      top="40px" right="175px" :small="true"/>
            <img :src="image" :class="{'highlighted': highlighted(2)}">
          </div>
        </div>
        <div class="column right is-5">
          <div>
            <h2 class="title" :class="{'highlighted': highlighted(0)}">
              {{ state.title.data}}
            </h2>
            <p :class="{'highlighted': highlighted(1)}">
              {{ state.text.data}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="checkComponent()" height="225">
        <FieldsLayout :store="store"/>
      </TextsEditMenu>
    </transition>
  </div>
</template>

<script>
  import ViewsMixin from '../../mixins/ViewsMixin';
  import TextsEditMenu from '../../components/Edit/Texts/TextsEditMenu';
  import EditIcon from '../../components/Edit/EditIcon';
  import FieldsLayout from '../Layouts/FieldsLayout';

  export default {
    name: 'Promo',
    mixins: [ViewsMixin],
    components: {TextsEditMenu, EditIcon, FieldsLayout},
    data: () => ({
      component: "Promo",
      type: 'text',
    }),
    computed: {
      image() {
        let gallery = this.galleriesEdit.getStore('Promo');
        return this.getImage(0, gallery).image;
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .edit-area {
    .label {
      color: white;
    }
  }

  .container {
    height: 370px;
    margin-top: 100px;

    .column {
      h2 {
        display: block;
        margin-bottom: 5px;
      }
      p {
        display: block;
        font-size: 16px;
        line-height: 22px;
      }
    }

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
