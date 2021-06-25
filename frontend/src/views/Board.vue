<template>
<v-card
    :loading="loading"
    class="mx-auto"
    max-width="980"
  >

  <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="selectList()"
    >
      조회
    </v-btn>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="test1()"
    >
      test1
    </v-btn>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="test2()"
    >
      test2
    </v-btn>
    <file-download/>
<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            제목
          </th>
          <th class="text-left">
            내용
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in boardList"
          :key="item.board_no"
          @dblclick="showBoard(index)"
        >
          <td>{{ item.subject }}</td>
          <td>{{ item.contents }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  






  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">게시판</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
              {{saveBoard.boardNo}}
                <v-text-field
                  label="제목"
                  required
                  v-model=saveBoard.subject
                ></v-text-field>
                <v-textarea
                solo
                name="input-7-4"
                label="Solo textarea"
                v-model=saveBoard.contents
              ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <file-upload/>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            닫기
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveYmBoard()"
          >
            저장
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>          
</v-card>
</template>

<script>
import FileDownload from '../components/FileDownload.vue';
import FileUpload from '../components/FileUpload.vue';
export default {
  components: { FileUpload, FileDownload },
  name: "Board",
  data () {
      return {
        boardList: [],
        loading: false,
        dialog : false,
        saveBoard:{boardNo: 0, subject: '', contents: ''}
      }
    },
    created(){
      
    },
    methods:{
      selectList(){
        var _this = this;
        _this.loading = true;
        this.$socket.emit('selectYmBoardList', {}, (data)=>{
          _this.loading = false;
          _this.boardList = data.row
        })
        ;
      },
      saveYmBoard(){
        var _this = this;
        this.$socket.emit('saveYmBoard', _this.saveBoard, (data)=>{
          console.log(data)
          _this.dialog = false;
        });
      },
      showBoard(no){
        this.saveBoard = this.boardList[no];
        this.dialog = true;
      },
      test1(){
        this.axios.get('/test1',{})
        .then(item => {
          console.log(item);
        })
        .then(() =>{
          _this.loading = false;
          _this.dialog = false;
        });
      },
      test2(){
        this.axios.get('/test2',{})
        .then(item => {
          console.log(item);
        })
        .then(() =>{
          _this.loading = false;
          _this.dialog = false;
        });
      }
    }
}
</script>