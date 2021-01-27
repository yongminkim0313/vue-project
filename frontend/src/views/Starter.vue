<template>
    <section class="section section-shaped section-lg my-0">
    <div class="container">
      <base-alert type="warning" icon="ni ni-bell-55" dismissible>
                <span slot="text"><strong>Warning!</strong> This is a warning alert—check it out!</span>
            </base-alert>
      <inputs></inputs>
    </div>
    </section>
</template>
<script>
import Inputs from './components/Inputs.vue';
export default {
  components: {
    Inputs
  },
  data() {
    return {
    };
  }};
</script>
<style>
</style>
