<template>
  <div id="app">
    <!-- <router-view /> -->
    <img src="@/asserts/images/logo.png" alt="logo" />
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello vue 9 !!'
    }
  }
}
</script>
