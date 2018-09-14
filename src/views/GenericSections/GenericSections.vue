<template>
  <div>
    <section class="section section-container">
      <div class="container custom-tabs-sections">
        <b-tabs position="" class="block"
                v-model="activeTab">
                <!--v-scroll-reveal="sReveal('top', 200, 100, 1500)">-->
          <b-tab-item v-for="(section, i) in sections" :key="i"
                      :label="section.state.title.data">
            <EditIcon :store="section" :edit="edit"/>
            <div class="content">
              <Title v-scroll-reveal.reset="sReveal(side, 1, 100, 1500)">
                {{ section.state.title.data }}
              </Title>
              <p class="sub-title" v-scroll-reveal.reset="sReveal(side, 1, 100, 1500)">
                {{ section.state.sub_title.data }}
              </p>
            </div>

            <div class="text1" v-scroll-reveal.reset="sReveal(side, 1, 100, 1500)">
              <p>
                {{ section.state.text1.data }}
              </p>
            </div>
            <div class="columns is-variable is-8">
              <div class="column">
                <SectionImage class="image"
                              v-scroll-reveal.reset="sReveal(side, 200, 100, 1500)"
                              top="20px"
                              right="20px"
                              :image="getImage(section)"
                              :edit="galleryEdit"
                              :store="section.gallery">
                </SectionImage>
              </div>
              <div class="column">
                <p v-scroll-reveal.reset="sReveal(side, 1, 100, 1500)">
                  {{ section.state.text2.data }}
                </p>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <SectionsEditMenu v-if="checkComponent()">
        <FieldsLayout :store="store"></FieldsLayout>
      </SectionsEditMenu>
    </transition>
  </div>
</template>

<script>
import Title from "../../components/Title";
import SectionsEditMenu from "../../components/Edit/Texts/SectionsEditMenu";
import FieldsLayout from "../Layouts/FieldsLayout";
import EditIcon from "../../components/Edit/EditIcon";
import SectionsStore from "../../components/Edit/Texts/SectionsStore";
import SectionImage from "../../components/SectionImage";
import GalleryStore from "../../components/Edit/Galleries/GalleriesStore";
import ViewsMixin from "../../mixins/ViewsMixin";


export default {
  name: "GenericSections",
  components: { SectionImage, EditIcon, FieldsLayout, SectionsEditMenu, Title },
  mixins: [ViewsMixin],
  data: () => ({
    activeTab: 0,
    type: "text",
    side: 'right',
  }),
  computed: {
    edit() {
      return SectionsStore;
    },
    store() {
      return this.sections[this.activeTab];
    },
    galleryEdit() {
      return GalleryStore;
    },
    sections() {
      return this.edit.genericStores;
    },
  },
  watch: {
    activeTab(value, oldValue) {
      this.side = value > oldValue ? 'right' : 'left';
    }
  },
  methods: {
    checkComponent() {
      if (this.edit.state.active) {
        let name = this.edit.state.currentStore.name
        return name === this.sections[this.activeTab].name;
      }
      return false;
    },
    getImage(section) {
      if (section.gallery.hasLoaded) {
        return section.gallery.images[0].image;
      } else {
        setTimeout(() => {
          return this.getImage(section);
        }, 500);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.content {
  margin-top: 50px;
}

.text1 {
  margin-bottom: 40px !important;
}
</style>
