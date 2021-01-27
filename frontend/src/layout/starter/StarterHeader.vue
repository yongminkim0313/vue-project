<template>
    <base-nav content-id= 'navbar-primary' type="primary" effect="dark" title="yongmin's project" expand>
    <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="/">
                        yongmin's project
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu" target="`navbar-primary`">
close
                    </close-button>
                </div>
            </div>

    </base-nav>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";
export default {
  components: {
    BaseNav,CloseButton
  },
  data() {
    return {
     
    };
  }
};
</script>
<style>
</style>
