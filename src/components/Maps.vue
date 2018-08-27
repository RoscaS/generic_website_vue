<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>


  export default {
    name: "Maps",
    props: {
      name: {type: String},
    },
    data() {
      return {
        // place: Options.name,
        mapName: this.name + "-map",
        place: 'Fromagerie des reussilles',
        latitude: null,
        longitude: null
      };
    },
    mounted:

      function() {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {'address': this.place},
          (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              this.latitude = results[0].geometry.location.lat();
              this.longitude = results[0].geometry.location.lng();

              const options = {
                zoom: 16,
                center: new google.maps.LatLng(this.latitude, this.longitude)
              };

              const position = new google.maps.LatLng(this.latitude, this.longitude);
              const el = document.getElementById(this.mapName);
              const map = new google.maps.Map(el, options);
              const marker = new google.maps.Marker({position, map});
            }
          }
        );
      },

  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  .google-map {
    border-radius: 8px;
    width: 380px;
    height: 500px;
    margin: 0 auto;
    background: gray;
  }

</style>
