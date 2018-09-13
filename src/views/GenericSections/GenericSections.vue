<template>
  <section class="section section-container">
    <div class="container">
      <div class="">
        <b-tabs position="" class="block" v-model="activeTab">
          <b-tab-item v-for="(section, i) in sections" :key="i"
                      :label="section.name">
            <div class="content">
              <Title>{{ section.state.title.data }}</Title>
              <p class="sub-title">
                {{ section.state.sub_title.data }}
              </p>
            </div>

            <div class="text1">
              <p>
                {{ section.state.text1.data }}
              </p>
            </div>
            <div class="columns is-variable is-8">
              <div class="column">
                <SectionImage class="image"
                              top="20px"
                              right="20px"
                              :image="getImage(section)"
                              :edit="galleryEdit"
                              :store="section.gallery">
                </SectionImage>
              </div>
              <div class="column">
                <p>
                  {{ section.state.text2.data }}
                </p>
              </div>
            </div>

          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>

</template>

<script>
import Title from "../../components/Title";
import SectionsEditMenu from "../../components/Edit/Texts/SectionsEditMenu";
import FieldsLayout from "../Layouts/FieldsLayout";
import EditIcon from "../../components/Edit/EditIcon";
import SectionsStore from "../../components/Edit/Texts/SectionsStore";
import SectionImage from "../../components/SectionImage";
import GalleryStore from "../../components/Edit/Galleries/GalleriesStore";

export default {
  name: "GenericSections",
  components: { SectionImage, EditIcon, FieldsLayout, SectionsEditMenu, Title },
  data: () => ({
    activeTab: 0
  }),
  computed: {
    edit() {
      return SectionsStore;
    },
    galleryEdit() {
      return GalleryStore;
    },
    sections() {
      return this.edit.genericStors;
    }
  },
  methods: {
    getImage(section) {
      if (section.gallery.hasLoaded) {
        return section.gallery.images[0].image;
      } else {
        setTimeout(() => {
          return this.getImage(section);
        }, 500);
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.text1 {
  margin-bottom: 40px !important;
}
</style>
