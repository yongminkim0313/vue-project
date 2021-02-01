<template>
    <section class="section section-shaped section-lg my-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <base-alert type="warning" icon="ni ni-bell-55" dismissible>
              <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
          </base-alert>
          <base-alert type="warning" icon="ni ni-bell-55" dismissible>
              <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
          </base-alert>
          <base-alert type="warning" icon="ni ni-bell-55" dismissible>
              <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
          </base-alert>
          <base-alert type="warning" icon="ni ni-bell-55" dismissible>
              <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
          </base-alert>
          <base-input addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker slot-scope="{focus, blur}"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{allowInput: true}"
                          class="form-control datepicker"
                          v-model="dates.simple">
            </flat-picker>
          </base-input>
        </div>
        </div>
    </div>
    </section>
</template>
<script>
import Inputs from './components/Inputs.vue';
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

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
    };
  },
  created() {
    this.axios({
        url: "/api/test"

      }).then(result =>{
        // console.log(result);
      })
  }
   
  
  };
</script>
<style>
</style>
