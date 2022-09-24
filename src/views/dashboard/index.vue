<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ $store.state.user.userInfo.username }}</div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'Dashboard',
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: 'https://pics0.baidu.com/feed/64380cd7912397dd274c03b5279c0bbed0a28776.jpeg?token=c23573257487c76d6ff931a505572d58',
      size: 300
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
