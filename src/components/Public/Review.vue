<template>
  <SectionContainer :title="title" :sub-title="subTitle">
    <div slot="content">

      <div class="level">

        <div class="level-item">
          <div class="level is-mobile overall">
            <div class="level-left"
                 v-scroll-reveal="{
                    origin: 'left',
                    distance: '100px',
                    duration: 1500,
                    delay: 0,
                    easing: 'ease',
                   }">
              {{ overall }}
            </div>
            <div class="level-right">
              <div class="level-item"
                   v-scroll-reveal="{
                      origin: 'top',
                      distance: '0px',
                      duration: 1500,
                      delay: 0,
                      easing: 'ease',
                     }">
                  <span v-for="star in getStarsList(overall)">
                    <i class="fas fa-star" v-if="star == 1"></i>
                    <i class="fas fa-star-half" v-if="star == 2"></i>
                  </span>
              </div>
              <div class="leve-item"
                   v-scroll-reveal="{
                      origin: 'right',
                      distance: '100px',
                      duration: 1500,
                      delay: 0,
                      easing: 'ease',
                     }">
                <a target="_blank" :href="reviewAll">80+ reviews</a>
              </div>
            </div>
          </div>
        </div>
        <div class="level-right"
             v-scroll-reveal="{
                origin: 'left',
                distance: '100px',
                duration: 3500,
                delay: 500,
                easing: 'ease',
               }">
          <a target="_blank" :href="reviewNew" class="button _btn no-tr">
            <i class="fas fa-pencil-alt"></i>
            &nbsp; Ajouter une review
          </a>
        </div>
      </div>


      <div class="columns is-multiline">
        <div class="column is-6"
             v-for="review in reviews"
             v-scroll-reveal="{
              origin: 'bottom',
              distance: '100px',
              duration: 1500,
              delay: 0,
              easing: 'ease',
             }">
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
    </div>
  </SectionContainer>

</template>

<script>
  import SectionContainer from '../Components/SectionContainer';
  import axios from 'axios';
  import moment from 'moment';


  export default {
    name: "Review",
    components: {SectionContainer},
    props: {
      url: {type: String},
    },

    data() {
      return {
        title: null,
        subTitle: null,
        reviewAll: null,
        reviewNew: null,
        overall: null,
        reviews: null,
      };
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

    mounted() {
      axios.get(this.url).then(response => {
        let data = response.data;
        this.title = data.title;
        this.subTitle = data.sub_title;

        this.reviewAll = data.g_review_all_url;
        this.reviewNew = data.g_review_new_url;
        this.overall = data.reviews.overall;
        this.reviews = data.reviews.reviews;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .overall {
    width: 350px;
    max-width: 350px;
    margin: 40px auto 40px auto;
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
