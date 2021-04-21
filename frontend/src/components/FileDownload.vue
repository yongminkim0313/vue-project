<template>
    <v-card v-if="fileInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Files</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(file, index) in fileInfos" :key="index">
            <a :href="file.url" target="_blank">{{ file.ATCHMNFL_ORIGIN_FILE_NM }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>
<script>

export default {
  name: "file-download",
  inheritAttrs: false,
  props: {},
  components: {  },
  data() {
    return {
      fileInfos:[]
    };
  },
  created() {
    this.axios.post('/api/downloadList')
      .then(item => {
        this.fileInfos = item.data;
        console.log(item);  
      });
  },
  methods: {
  },
};
</script>
<style>
</style>



