<template>
  <div class="mapBox" id="map"></div>
</template>

<script>
import siteSettings from "../site-settings";

export default {
  name: "Maps",
  data() {
    return {
      place: "Fromagerie des reussilles",
      latitude: null,
      longitude: null
    };
  },
  mounted() {
    let coords = [siteSettings.long, siteSettings.lat];
    mapboxgl.accessToken = siteSettings.mapBox;
    let map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
      center: coords, // starting position [lng, lat]
      zoom: 16 // starting zoom
    });
    var marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global";

.mapBox {
  border-radius: 8px;
  width: 380px;
  height: 500px;
  margin: 0 auto;
  background: gray;

  @media screen and (max-width: 960px) {
    width: 100%;
    height: 250px;
  }
}
</style>
