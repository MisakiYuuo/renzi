<template>
  <div>
    <h1>count={{ $store.state.count }}</h1>
    <button @click="$store.commit('add')">+1</button>
    <button @click="add">+1</button>
    <h1>{{ $store.getters.showCount }}</h1>
    <h1>{{ showCount }}</h1>
    <h1>{{ showCount }}</h1>
    <h1>{{ showCount }}</h1>
    <hr>
    <h1>token={{ $store.state.test.token }}</h1>
    <button @click="$store.commit('test/setToken')">setToken</button>
    <SvgIcon icon-class="eye-open" class-name="redColor"></SvgIcon>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SvgIcon from '../../components/SvgIcon/index.vue'
export default {
  name: '',
  components: { SvgIcon },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['showCount'])
  },
  created() {
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    ...mapMutations(['add'])
  }
}
</script>

<style scoped>
.redColor{
  color:red
}
</style>
