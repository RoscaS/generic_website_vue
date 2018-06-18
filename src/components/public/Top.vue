<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <div class="has-background-primary">p</div>
      </div>
      <div class="column is-6">
        <div class="debug">
          <div class="top-title">MySite.</div>
          <div class="top-ribbon">
            <div class="text">FORALL</div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="has-background-primary">p</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Top',
    data() {
      return {
        msg: ''
      };
    }
  };
</script>

<style scoped lang="scss">
  @import 'sass/variables';
  @import url('https://fonts.googleapis.com/css?family=Dancing+Script');

  .debug {
    border: 1px solid black;
  }

  .top-title {
    font-family: 'Dancing Script', cursive, bold;
    font-size: 130px;
    text-align: center;
    color: $top-title;
    display: block;
  }

  .top-ribbon {
    z-index: -1;
    display: block;
    letter-spacing: 0.1em;
    padding: .26em 0 .26em 2em;
    margin: -40px auto 0 auto;
    position: relative;
    max-width: fit-content;
    color: $ribbon-text;
    background: $ribbon;

    &:before, &:after {
      content: "";
      width: .2em;
      bottom: 0;
      position: absolute;
      display: block;
      border: 1.5em solid $ribbon;
      z-index: -1;
    }

    &:before {
      top: 0;
      left: -1.95em;
      border-right-width: .75em;
      border-left-color: transparent;
    }

    &:after {
      top: 0;
      right: -1.95em;
      border-left-width: .75em;
      border-right-color: transparent;
    }

    // Text
    & :first-child {
      text-align: center;
      margin-left: -11px;
      font-size: 28px;
      letter-spacing: 20px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;

      &:before, &:after {
        content: "";
        bottom: -.5em;
        position: absolute;
        display: block;
        border-style: solid;
        border-color: $ribbon transparent transparent transparent;
        z-index: -1;
      }

      &:before {
        top: 0;
        left: 0;
        border-width: .5em 0 0 .5em;
      }

      &:after {
        top: 0;
        right: 0;
        border-width: .5em .5em 0 0;
      }
    }
  }

</style>
