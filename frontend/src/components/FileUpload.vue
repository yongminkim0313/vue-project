<template>
  <section class="section section-shaped section-lg my-0">
<input type="file" id="FileBox" ref="FileBox" @change="fileChosen">
<base-progress :value="progress" label="진행바"></base-progress>
<base-button tag="a" href="#" type="primary" class="mt-4" @click="startUpload();">
                                        업로드
                                    </base-button>
  </section>
</template>
<script>
import BaseButton from './BaseButton.vue';

var fileReader;
fileReader = new FileReader();

export default {
  name: "file-upload",
  inheritAttrs: false,
  props: {
  },
  components: {BaseButton},
  data() {
    return {
      selectedFile: "",
      progress: 0,
    };
  },
  created() {
    this.$socket.on("MoreData", (data) => {
      //console.log("MoreData: ", data);
      this.progress = data.Percent;
      var Place = data.Place * 524288;
      var NewFile = "";
      if (this.selectedFile.webkitSlice)
        NewFile = this.selectedFile.webkitSlice(
          Place,
          Place + Math.min(524288, this.selectedFile.size - Place)
        );
      else
        NewFile = this.selectedFile.slice(
          Place,
          Place + Math.min(524288, this.selectedFile.size - Place)
        );

      fileReader.readAsBinaryString(NewFile);
    });
    this.$socket.on("endData", (data) => {
      this.progress = data.Percent;
    });
  },
  methods: {
    startUpload() {
      var _this = this;
      if (_this.$refs.FileBox != "") {
        fileReader.onload = function (event) {
          var data;
          if (!event) {
            data = fileReader.content;
          } else {
            data = event.target.result;
          }
          _this.$socket.emit("Upload", { Name: _this.selectedFile.name, Data: data });
        };

        _this.$socket.emit("Start", {
          Name: _this.selectedFile.name,
          Size: _this.selectedFile.size,
        });
      } else {
        alert("Please Select A File");
      }
    },
    fileChosen(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile.name);
    },
    download() {
      console.log(process.env.VUE_APP_API_URL + "/api/download");
    },
  },
};
</script>
<style>
</style>



