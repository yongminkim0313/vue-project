<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          fab
          dark
          v-bind="attrs"
          v-on="on"
        > 
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template>
                <div class="text-center text-muted mb-4">
                    <small>로그인 해주세요</small>
                </div>
                <form role="form">
                    <base-input alternative
                                class="mb-3"
                                placeholder="Email"
                                addon-left-icon="ni ni-email-83"
                                v-model="userData.email">
                    </base-input>
                    <base-input alternative
                                type="password"
                                placeholder="Password"
                                addon-left-icon="ni ni-lock-circle-open"
                                v-model="userData.password"
                                @keypress.enter="login()"
                                >
                    </base-input>
                    <base-checkbox>
                        아이디 기억
                    </base-checkbox>
                    <div class="row mt-3">
            <div class="col-6">
                <a href="#" class="text-light">
                    <small>비밀번호를 잊음?</small>
                </a>
            </div>
            <div class="col-6 text-right">
                <a href="#" class="text-light">
                    <small>신규가입</small>
                </a>
            </div>
        </div>
                    <div class="text-center">
                      <v-btn
                        class="primary"
                        text
                        :loading="loading"
                        :disabled="loading"
                        @click="login()"
                      >
                        로그인
                      </v-btn>
                        
                    </div>
                </form>
            </template>
        </card>

    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'LoginDialog',

  components: {
    
  },
  data(){
    return {
      dialog: false,
      loading : false,
      userData: {}
    }
  },
  methods : {
    login(){
      var _this = this;
      _this.loading = true;
      this.axios.post('/auth/login',_this.userData)
      .then((data)=>{
        _this.userData = {};
        _this.dialog = false;
       })
      .catch(err=>{
      })
      .then(() =>{
        _this.loading = false;
      });
    }
  }
};
</script>
<style>
</style>
