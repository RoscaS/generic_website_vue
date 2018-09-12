<template>
  <b-modal :active.sync="showModal"
           :width="640"
           scroll="clip"
           :canCancel="['outside', 'x', 'escape']">
    <div class="modal-links">
      <ul id="ModalLinks">
        <li v-for="link in links">
          <transition name="fade">
            <a class="no-tr"
               :href="link.id"
               :v-show="link.show"
               @click="showModal = false">
              <i class="far fa-fw" :class="link.icon"></i>
              {{link.name}}
            </a>
          </transition>
        </li>
        <li>
          <Logout/>
        </li>
      </ul>
    </div>
  </b-modal>
</template>

<script>
	import Logout from "./Logout";

	export default {
		name: "MobileModal",
		components: {Logout},
		props: {
			links: {type: Array},
			mobileModal: {type: Boolean},
		},
		data: () => ({
			canCancel: [true, false, true],
		}),
		computed: {
			showModal: {
				get() {
					if (this.mobileModal === true) {
						this.showLinks();
					}
					return this.mobileModal;
				},
				set(value) { this.$emit('closeModal', value);}
			}
		},
		methods: {
			showLinks() {
				setTimeout(() => {
					let links = Array.from(
						document.getElementById("ModalLinks").children
					);
					let time = 0;
					links.forEach(link => {
						setTimeout(() => {
							link.style.opacity = 1;
							link.classList.add("fadeInLeft");
						}, time);
						time += 225;
					});
				}, 10);
			},
		},
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .modal-links {
    display: flex;
    justify-content: center;
    #ModalLinks {
      display: flex;
      flex-direction: column;
      li {
        list-style: none;
        opacity: 0;
      }
      a {
        font-size: 30px;
        line-height: 60px;
        color: white;
        &:hover {
          color: $link-hover;
        }
      }
    }
  }

</style>
