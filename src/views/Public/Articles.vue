<template>
  <section id="Articles" class="section section-container">
    <EditIcon Right="500px"
              Top="20px"
              :Component="$options.name"
              @backup-original-data="">

      <div class="container">
        <div class="content">
            <div>
              <Title>Nos Articles</Title>
              <p class="sub-title">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, delectus doloremque ex excepturi odit quaerat quos voluptate. A animi, architecto dicta exercitationem labore laudantium quidem. Molestiae nostrum sed tempora voluptas.
              </p>
            </div>
            <img src="http://via.placeholder.com/1250x400" alt="">
            <br>
            <br>
            <br>
            <br>
            <img src="http://via.placeholder.com/1250x600" alt="">

        </div>
      </div>
    </EditIcon>
  </section>
</template>

<script>
  import EditIcon from '../../components/Edit/EditIcon'

  export default {
    name: "Articles",
    components: {EditIcon},
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';


</style>
