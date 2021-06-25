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
    // this.$socket.on('fileCommend', (message)=>{
    //   _this.selectFileList();
    // });
  },
  methods: {
    deleteFile(atchmnflId){
      this.axios.post('/api/deleteFile',{atchmnflId : atchmnflId})
      .then(item => {
        this.$socket.emit('fileDel')
      });
    },
    selectFileList(){
      this.axios.post('/api/downloadList')
      .then(item => {
        console.log(item);
        this.fileInfos = item.data;
      })
          .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        }
        else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    }
  },
};
</script>
<style>
</style>



