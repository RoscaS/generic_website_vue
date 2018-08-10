<template>
  <BaseLayout :id="$options.name"
              :title="state.title.data"
              :subTi="state.subTi.data"
              :state="state"
              :activeTab="activeTab"
              :loading="loading"
              @changeTab="activeTab=$event">
    <div class="level">
      <div class="level-item">
        <div class="level is-mobile overall">
          <div class="level-left"
               v-scroll-reveal="sReveal('left', 0, 100, duration=1500)">
            {{ overall }}
          </div>
          <div class="level-right">
            <div class="level-item"
                 v-scroll-reveal="sReveal('top', 0, 0, duration=1500)">
                <span v-for="star in getStarsList(overall)">
                  <i class="fas fa-star" v-if="star == 1"></i>
                  <i class="fas fa-star-half" v-if="star == 2"></i>
                </span>
            </div>
            <div class="leve-item"
                 v-scroll-reveal="sReveal('right', 0, 100, duration=1500)">
              <a target="_blank" :href="reviewAll">80+ reviews</a>
            </div>
          </div>
        </div>
        <div class="level-right"
             v-scroll-reveal="sReveal('left', 50010010, duration=3500)">
          <a target="_blank" :href="reviewNew"
             class="button _btn no-tr">
            <i class="fas fa-pencil-alt"></i>
            &nbsp; Ajouter une review
          </a>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-6"
           v-for="review in reviews"
           v-scroll-reveal="sReveal('bottom', 0, 100, duration=1500)">
        <div class="card shadow">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="review.profile_photo_url">
                </figure>
              </div>
              <div class="media-content">
                <span class="stars"
                      v-for="star in getStarsList(review.rating)">
                  <i class="full fas fa-star" v-if="star == 1"></i>
                  <i class="empty fas fa-star" v-if="star == 0"></i>
                </span>
                <br>
                <a :href="review.author_url" class="subtitle is-6">{{
                  review.author_name }}</a>
                &nbsp; {{ getDateTime(review.time) }}
              </div>
            </div>

            <div class="content">
              {{ review.text }}
              {{ review.rating }}
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>

  </BaseLayout>
</template>

<script>
  import ReviewStore from './ReviewStore';
  import moment from 'moment';
  import mixin from '../../mixins/PublicMixin';


  export default {
    name: "Review",
    mixins: [mixin],

    data() {
      return {
        store: ReviewStore,
        state: { title: new this.Title(), subTi: new this.SubTitle(),},
      };
    },
    computed: {
      reviewAll() { return this.store.reviewAll; },
      reviewNew() { return this.store.reviewNew; },
      overall() { return this.store.overall; },
      reviews() {return this.store.reviews; },
    },
    methods: {
      getDateTime(epoch) {
        return moment(epoch * 1000).format('D/M/Y');
      },
      getStarsList(rating) {
        let lst = [];
        let value = parseInt(rating);
        for (let i = 1; i <= 5; i++) {
          value-- <= 0 ? lst.push(0) : lst.push(1);
        }
        if (rating % 1 != 0) {
          lst[parseInt(rating) + 1] = 2;
        }
        return lst;
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .overall {
    width: 350px;
    max-width: 350px;
    margin: 0 auto 40px auto;
    .level-left {
      font-family: arial, sans-serif;
      font-size: 32px;
      color: $star-full;
    }
    .level-right {
      span {
        font-size: 25px;
        color: $star-full;
        margin-left: 5px;
      }
    }
  }

  .stars {
    .full {
      color: $star-full;
    }
    .empty {
      color: $star-empty;
    }
  }

</style>
