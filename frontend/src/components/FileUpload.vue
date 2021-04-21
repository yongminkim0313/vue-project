<template>
  <div>
    <div v-if="currentFile">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </div>
</template>
<script>
import BaseButton from "./BaseButton.vue";

var fileReader;
fileReader = new FileReader();

export default {
  name: "file-upload",
  inheritAttrs: false,
  props: {},
  components: { BaseButton },
  data() {
    return {
      currentFile: null,
      progress: 0,
      message:'',
      fileInfos:[]
    };
  },
  created() {
    this.$socket.on("MoreData", (data) => {
      //console.log("MoreData: ", data);
      this.progress = data.Percent;
      var Place = data.Place * 524288;
      var NewFile = "";
      if (this.currentFile.webkitSlice)
        NewFile = this.currentFile.webkitSlice(
          Place,
          Place + Math.min(524288, this.currentFile.size - Place)
        );
      else
        NewFile = this.currentFile.slice(
          Place,
          Place + Math.min(524288, this.currentFile.size - Place)
        );

      fileReader.readAsBinaryString(NewFile);
    });
    this.$socket.on("endData", (data) => {
      this.progress = data.Percent;
    });
  },
  methods: {
    upload() {
      var _this = this;
      if (_this.currentFile) {
        fileReader.onload = function (event) {
          var data;
          if (!event) {
            data = fileReader.content;
          } else {
            data = event.target.result;
          }
          _this.$socket.emit("Upload", {
            Name: _this.currentFile.name,
            Data: data,
          });
        };

        _this.$socket.emit("Start", {
          Name: _this.currentFile.name,
          Size: _this.currentFile.size,
        });
      } else {
        alert("Please Select A File");
      }
    },
    selectFile(files) {
      if (files) {
        this.currentFile = files;
        console.log(this.currentFile.name);
      }else{
        this.currentFile = null;
      }
    },
    download() {
      console.log(process.env.VUE_APP_API_URL + "/api/download");
    },
  },
};
</script>
<style>
</style>



