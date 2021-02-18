<template>
    <section class="section section-shaped section-lg my-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <!-- <base-alert type="warning" icon="ni ni-bell-55" dismissible>
              <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
          </base-alert> -->
          <base-input addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker slot-scope="{focus, blur}"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{allowInput: true}"
                          class="form-control datepicker"
                          v-model="dates.simple">
            </flat-picker>
          </base-input>
          <div id="UploadBox">
        <h2>Video Uploader</h2>
        <span id='UploadArea'>
        <label for="FileBox">Choose A File: </label><input type="file" id="FileBox" ref="FileBox" @change="fileChosen"><br>
        <label for="NameBox">Name: </label><input type="text" id="NameBox" v-model="selectedFile.name"><br>
        <button type='button' class='Button' @click="startUpload">Upload</button>
        <a href="#" role="button" @click="download()">download</a>
        <div v-html="html"></div>
        <base-progress :value="progress" label="zzz"></base-progress>
        </span>
        </div>
        </div>
        </div>
    </div>
    </section>
</template>
<script>
import Inputs from './components/Inputs.vue';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import io from "socket.io-client";

const socket = io(process.env.VUE_APP_SOCKET_URL,{
  path: "/msg/",
});
var fileReader;
fileReader = new FileReader();

export default {
  components: {
    Inputs,flatPicker
  },
  data() {
    return {
      dates: {
        simple: "2018-07-17",
        range: "2018-07-17 to 2018-07-19"
      }
      ,selectedFile :""
      , html : ""
      ,progress: 0
    };
  },
  created() {
    // this.axios({
    //     url: "/api/test"

    //   }).then(result =>{
    //     // console.log(result);
    //   })

     socket.on('MoreData', (data) => {
        console.log('MoreData: ', data);
        this.progress = data.Percent;
        var Place = data.Place * 524288;
        var NewFile = '';
        if (this.selectedFile.webkitSlice)
            NewFile = this.selectedFile.webkitSlice(Place, Place + Math.min(524288, (this.selectedFile.size - Place)));
        else
            NewFile = this.selectedFile.slice(Place, Place + Math.min(524288, (this.selectedFile.size - Place)));
        
        console.log('첫:', Place, '끝:', Place + Math.min(524288, (this.selectedFile.size - Place)));
        fileReader.readAsBinaryString(NewFile);
    });
    socket.on('endData', (data) => {
      this.progress = data.Percent;
    });
  },
  methods : {
    startUpload() {
      
      var _this = this;
      if(_this.$refs.FileBox != "") {
        
        var content = "<span id='NameArea'>Uploading " + _this.selectedFile.name + "</span>";
        content += "<span id='Uploaded'> - <span id='MB'>0</span>/" + Math.round(_this.selectedFile.size / 1048576) + "MB</span>";
        _this.html = content;
        console.log('startUpload11111');
        
        
        fileReader.onload = function(event){
          console.log('startUpload2222');
          var data
          if(!event){
            data = fileReader.content;
          }else{
            data = event.target.result;
          }
          console.log('startUpload3333');
          socket.emit('Upload', { 'Name' : _this.selectedFile.name, Data : data });
        }


        console.log('startUpload4444')
        socket.emit('Start', { 'Name' : _this.selectedFile.name, 'Size' : _this.selectedFile.size });
      }else{
        alert("Please Select A File");
      }
    },
    fileChosen(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile.name);
    },
    download(){
      console.log(process.env.VUE_APP_API_URL+"/api/download");
    }
  }
   
  
  };
</script>
<style>
</style>



