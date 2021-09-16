<template>
  <v-app>
    <v-card class="overflow-hidden">
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>YM's Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <login-dialog></login-dialog>
      <router-link to="/login">
        <v-btn icon>
          <v-icon dark>
        mdi-format-list-bulleted-square
      </v-icon>
        </v-btn>
      </router-link>
      
    </v-app-bar>
</v-card>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link to="/">
          <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          </router-link>

          <router-link to="/customComponents">
          <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                customComponents
              </v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link to="/board">
          <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                board
              </v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link to="/News">
          <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                news
              </v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-main class="pt-2">
      <router-view/>
    </v-main>
    
    <messenger/>
    
  </v-app>
  
</template>

<script>
import Messenger from '@/components/Messenger.vue';
import LoginDialog from '@/components/LoginDialog.vue';

export default {
  name: 'App',
  components: {
      Messenger,
      LoginDialog,
  },
  data: () => ({
    drawer: false,
      group: null,
      alert: true,
  }),
};
</script>
