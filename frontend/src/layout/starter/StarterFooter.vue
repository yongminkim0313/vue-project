<template>
    <footer>
        <messenger/>
       
    </footer>
</template>
<script>
import Messenger from '@/components/Messenger.vue';

export default {
  components: {
      Messenger
  },
  name: 'starter-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
