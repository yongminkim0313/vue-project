<template>
<v-container fluid>
    <v-row>
        <v-col xs="4" sm="4" md="4">
            <v-card
                :loading="loading"
                class="mx-auto"
                width=700
            >
            <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="secondary"
                @click="test()"
            >
                test
            </v-btn>

            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        No
                    </th>
                    <th class="text-left">
                        제목
                    </th>
                    <th class="text-left">
                        내용
                    </th>
                    <th class="text-left">
                        상세
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item, index) in news01List"
                    :key="item.title"
                    @dblclick="movePage(index)"
                    >
                    <td>{{ index+1 }}</td>
                    <td><v-img
                        :lazy-src=item.image_url
                        max-height="150"
                        max-width="250"
                        :src=item.image_url
                        ></v-img>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.summary }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
                
            </v-card>
        </v-col>
        <v-col xs="4" sm="4" md="4">
            <v-card
                :loading="loading"
                class="mx-auto"
                width=700
            >
            <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="secondary"
                @click="test()"
            >
                test
            </v-btn>

            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        No
                    </th>
                    <th class="text-left">
                        제목
                    </th>
                    <th class="text-left">
                        내용
                    </th>
                    <th class="text-left">
                        상세
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item, index) in news02List"
                    :key="item.title"
                    @dblclick="movePage(index)"
                    >
                    <td>{{ index+1 }}</td>
                    <td><v-img
                        :lazy-src=item.image_url
                        max-height="150"
                        max-width="250"
                        :src=item.image_url
                        ></v-img>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.summary }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
                
            </v-card>
        </v-col>
        <v-col xs="4" sm="4" md="4">
            <v-card
                :loading="loading"
                class="mx-auto"
                width=700
            >
            <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="secondary"
                @click="test()"
            >
                test
            </v-btn>

            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">
                        No
                    </th>
                    <th class="text-left">
                        제목
                    </th>
                    <th class="text-left">
                        내용
                    </th>
                    <th class="text-left">
                        상세
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(item, index) in news03List"
                    :key="item.title"
                    @dblclick="movePage(index)"
                    >
                    <td>{{ index+1 }}</td>
                    <td><v-img
                        :lazy-src=item.image_url
                        max-height="150"
                        max-width="250"
                        :src=item.image_url
                        ></v-img>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.summary }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
                
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
  components: { 
  },
  name: "News",
  data () {
      return {
        news01List: [],
        news02List: [],
        news03List: [],
        loading: false,
      }
    },
    created(){
      
    },
    methods:{
      test(){
        var _this = this;
        this.$socket.emit('test', {c_no:1}, (data)=>{
          console.log(data)
          _this.news01List = data;
        });
      },
      movePage(no){
        location.href=this.news01List[no].url;
      }
    }
}
</script>