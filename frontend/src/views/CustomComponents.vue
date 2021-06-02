<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    max-width="980"
  >
    <v-card-title>Cafe Badilico</v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll
      :items="items"
      :item-height="50"
      height="300"
    >
      <template v-slot:default="{ index, item }">
        <v-list-item>
          <v-list-item-avatar>
              <v-avatar
                :color="item.color"
                size="56"
                class="white--text"
              >
                <!-- {{ item.title }} -->
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ index }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
            <v-btn
              depressed
              small
              @click="eventShow(item.idx);"
            >
              View User

              <v-icon
                color="orange darken-4"
                right
              >
                mdi-open-in-new
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
<script>

export default {
  name: "components",
  components: {
  },
  data: () => ({
      loading: false,
      selection: 1,
      items:[{idx:1, title: '제목asdfasdfasdfasdf1', content:'내용1',color:'#2196F3'}
      ,{idx:2, title: '제목asdfasdf2', content:'내용2',color:'#90CAF9'}
      ,{idx:3, title: '제목sdfsdfasdfasdf3', content:'내용3',color:'#64B5F6'}
      ,{idx:4, title: '제목fsdfasdfasd4', content:'내용4',color:'#64B5F6'}
      ,{idx:4, title: '제목fsdfasdfasd4', content:'내용4',color:'#64B5F6'}
      ,{idx:4, title: '제목fsdfasdfasd4', content:'내용4',color:'#64B5F6'}
      ,{idx:4, title: '제목fsdfasdfasd4', content:'내용4',color:'#64B5F6'}]
  }),
  methods: {
      eventShow(event){
        console.log(event);
        return;
      }
    },
};
</script>
