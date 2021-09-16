<template>
    <header class="header-global">
        <v-card class="overflow-hidden">
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <router-link to="/jesusdream">
        <v-toolbar-title>주꿈카페</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      
      
    </v-app-bar>
    </v-card>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
