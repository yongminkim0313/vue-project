<template>
  <v-app>
    <v-main>
      <router-view name="header"></router-view>
      <router-view/>
      <router-view name="footer"></router-view>
    </v-main>
    
    
  </v-app>
  
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
      alert: true,
  }),
};
</script>
