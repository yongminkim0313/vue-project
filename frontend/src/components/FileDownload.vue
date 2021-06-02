<template>
    <v-card v-if="fileInfos.length > 0" class="mx-auto">
    <v-list subheader two-line >
      <v-subheader inset>Files</v-subheader>
      <v-list-item v-for="file in fileInfos" :key="file.title" >
        <v-list-item-avatar>
          <v-icon
            :class="file.color"
            dark
            v-text="file.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="file.ATCHMNFL_ORIGIN_FILE_NM"></v-list-item-title>
          <a :href="file.url" target="_blank">{{ file.ATCHMNFL_ORIGIN_FILE_NM }}</a>
          <v-list-item-subtitle v-text="file.ATCHMNFL_SIZE"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="deleteFile(file.ATCHMNFL_ID)">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
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
    var _this = this;
    _this.selectFileList();
    this.$socket.on('fileCommend', (message)=>{
      _this.selectFileList();
    });
  },
  methods: {
    deleteFile : function(atchmnflId){
      this.axios.post('/api/deleteFile',{atchmnflId : atchmnflId})
      .then(item => {
        this.$socket.emit('fileDel')
      });
    },
    selectFileList : function(){
      this.axios.post('/api/downloadList')
      .then(item => {
        this.fileInfos = item.data;
      });
    }
  },
};
</script>
<style>
</style>



