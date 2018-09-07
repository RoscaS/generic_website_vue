<template>
  <div @click.stop>
    <div class="loading" v-if="loading"></div>
    <transition name="lightbox-fade">
      <div class="wrapper">
        <img :src="src" class="image"  :key="src">
      </div>
    </transition>
  </div>
</template>

<script>
	export default {

		name: "LigthboxImage",

		props: {
			image: String,
		},

		data() {
			return {
				loading: true,
				src: false,
				style: {},
			};
		},

		mounted() {
			let image = new window.Image();
			image.onload = () => {
				this.loading = false;
				this.src = this.image;
				// this.resizeImage(image);
			};
			image.src = this.image;

			// this.resizeEvent = () => {
			//   this.resizeImage(image)
			// };

			// window.addEventListener('resize', this.resizeEvent);
		},

		destroyed() {
			window.removeEventListener('resize', this.resizeEvent);
		},

		methods: {
			// resizeImage(image) {
			//   let width = image.width;
			//   let height = image.height;
			//
			//   if (width > window.innerWidth || height > window.innerHeight) {
			//     let ratio = width / height;
			//     let windowRatio = window.innerWidth / window.innerHeight;
			//     if (ratio > windowRatio) {
			//       width = window.innerWidth;
			//       height = width / ratio;
			//     }
			//     else {
			//       height = window.innerHeight;
			//       width = height * ratio;
			//     }
			//   }
			//
			//   this.style = {
			//     wdth: width-200 + 'px',
			//     height: height-200 + 'px',
			//     top: ((window.innerHeight - height) * 0.5)+100 + 'px',
			//     left: ((window.innerWidth - width) * 0.5)+165 + 'px',
			//   };
			// }
		},
	};
</script>

<style scoped lang="scss">

  .wrapper {
    /*display: table;*/

    img {
      width: 80%;
      height: auto;
      vertical-align: middle;
      position:absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;

    }
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;
    background-color: #000;
    opacity: 0.5;
    border-radius: 20px;

    &:after {
      margin: 7.5px;
      content: '';
      display: block;
      width: 25px;
      height: 25px;
      background-color: #FFF;
      border-radius: 25px;
      animation: lightbox-loading .5s ease infinite;
    }
  }

  .lightbox-fade-enter-active, .lightbox-fade-leave-active {
    transition: opacity 0.5s;
  }

  .lightbox-fade-enter, .lightbox-fade-leave-active {
    opacity: 0;
  }

  @keyframes lightbox-loading {
    0% {
      opacity: 0.5;
      transform: scale(.75)
    }
    50% {
      opacity: 1;
      transform: scale(1)
    }
    100% {
      opacity: 0.5;
      transform: scale(.75)
    }
  }

</style>
