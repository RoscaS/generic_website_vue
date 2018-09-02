<template>
  <section class="section hero">

    <div v-scroll-reveal="{
          origin: 'top',
          distance: '20px',
          duration: 1500,
          delay: 0,
          easing: 'ease',
         }">
      <a class="button _btn no-tr"
         v-scroll-to="'#Home'">
        <i class="fas fa-arrow-up"></i>
        &nbsp; Haut de la page
      </a>
    </div>

    <div class="level is-mobile">
      <div class="level-item"
           v-for="icon in icons"
           v-scroll-reveal="{
                   origin: 'bottom',
                   distance: '20px',
                   duration: 1500,
                   delay: 0,
                   easing: 'ease',
                  }">
        <a class="no-tr" target="_blank" :href="icon.url">
          <i class="grow fab" :class="icon.icon"></i>
        </a>
      </div>
    </div>

    <p v-scroll-reveal="{
        origin: 'left',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
      Copyright &copy; {{ getCopyright() }}
    </p>
    <p v-scroll-reveal="{
        origin: 'right',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
      Design & code:
      <a class="jrosk" href="mailto:jrosk.ad@gmail.com" title="With  by JrosK">JrosK</a>
    </p>

  </section>
</template>

<script>
	import moment from 'moment';
	import TextsStore from "../components/Edit/Texts/TextsStore";


	export default {
		name: "Footer",
		data: () => ({
		}),
		computed: {
			contact() { return TextsStore.getStore("SiteContact").state; },

			icons() {
				return [
					{icon: 'fa-facebook', url: this.contact.facebook.data,},
					{icon: 'fa-tripadvisor', url: this.contact.tripadvisor.data,},
					{icon: 'fa-google', url: this.contact.google.data,},
					{icon: 'fa-twitter', url: this.contact.twitter.data,},
					{icon: 'fa-instagram', url: this.contact.instagram.data,},
					{icon: 'fa-linkedin', url: this.contact.linkedin.data,},
					{icon: 'fa-snapchat', url: this.contact.snapchat.data,},
				];
			}
		},
		methods: {
			getCopyright() {
				return moment().format('Y') + ' ' + this.contact.project_name.data;
			},
		}
	};
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: $separator;
    /*height: 250px;*/

    ._btn {
      border-color: white;
      color: white;

      &:hover {
        color: black;
        background-color: white;
      }
    }
  }

  .level {
    margin-top: 30px;
    width: 400px;
    .level-item {
      a {
        color: white;

        i {
          transition: transform .2s ease;
          font-size: 30px;
          transform: scale(1);

          &:hover {
            transition: transform .2s ease;
            transform: scale(1.2);
          }
        }
      }
    }
  }

  p {
    color: white;
    font-size: 16px;
  }

  .jrosk {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5px;

    &:hover {
      color: #FFFFFF;
    }

    &:after {
      background: #FFFFFF;
    }
  }

</style>
