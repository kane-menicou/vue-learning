<template>
  <div id="app">
    <Channel/>
  </div>
</template>

<script>
import Channel from './components/Channel'

export default {
  name: 'App',
  components: {
    Channel: Channel
  }
}
</script>

<style lang="scss">
    $fa-font-path: '~@fortawesome/fontawesome-free/webfonts';

    @import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";
    @import "~@fortawesome/fontawesome-free/scss/solid.scss";
    @import "~@fortawesome/fontawesome-free/scss/brands.scss";

    body, html {
        padding: 0;
        margin: 0;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: #f8f8f8;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #3a4c5e;
    }
</style>
