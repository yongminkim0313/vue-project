<template>
    <section class="section section-shaped section-lg my-0">
    <div class="container">
        <div class="row">
          <v-tabs
            v-model="tabs"
            align-with-title
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab href="#tab-1">
              Recents
            <v-icon>mdi-phone</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Favorites
              <v-icon>mdi-heart</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              Nearby
              <v-icon>mdi-account-box</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-title class="headline">
                  An awesome title
                </v-card-title>
                <v-card-text>
                  <p>
                    Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
                  </p>

                  <p>
                    Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
                  </p>

                  <p class="mb-0">
                    Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <v-card flat>
                <v-card-title class="headline">
                  An even better title
                </v-card-title>
                <v-card-text>
                  <p>
                    Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
                  </p>

                  <p class="mb-0">
                    Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
        <br/>
        </div>
    </section>
</template>
<script>

export default {
  components: {
  },
  data() {
    return {
      tabs: null,
      text:'123123',
    };
  },
  created() {
   
  },
  methods : {
  }
   
  
  };
</script>
<style>
</style>




