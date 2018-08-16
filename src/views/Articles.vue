<template>
  <section id="Articles" class="section section-container">
    <div class="columns">
      <div class="column" v-for="cat in categories" :key="cat.name.data">
        <div class="level" v-for="item in cat.items" :key="item.id">
          <div class="level-left">
            <div class="level-item">
              {{ item.name.data }}
            </div>
          </div>
          <div class="level-right">
            <b-field type="is-primary" class="level-item poule">
              <b-input v-model="item.name.data"
                       :maxlength="item.name.len"
                       :type="item.name.type"></b-input>
            </b-field>
          </div>
        </div>
      </div>

    </div>

    <!--<div class="container">-->
      <!--<div class="content">-->
        <!--<div>-->
          <!--<Title>Nos Articles</Title>-->
          <!--<p class="sub-title">-->
            <!--Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,-->
            <!--delectus doloremque ex excepturi odit quaerat quos voluptate. A-->
            <!--animi, architecto dicta exercitationem labore laudantium quidem.-->
            <!--Molestiae nostrum sed tempora voluptas.-->
          <!--</p>-->
        <!--</div>-->
        <!--<img src="http://via.placeholder.com/1250x400" alt="">-->
        <!--<br>-->
        <!--<br>-->
        <!--<br>-->
        <!--<br>-->
        <!--<img src="http://via.placeholder.com/1250x600" alt="">-->

      <!--</div>-->
    <!--</div>-->
  </section>
</template>

<script>
  import EditIcon from '../components/Edit/EditIcon';
  import ArticlesStore from '../components/Edit/Articles/ArticlesStore';

  export default {
    name: "Articles",
    components: {EditIcon},
    data() {
      return {
        store: ArticlesStore,
        categories: ArticlesStore.state.categories
      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  .poule {
    width: 120px;
  }

</style>
