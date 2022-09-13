<template>
  <div>
    <div>通过$store方法------{{ $store.state.count }}</div>
    <div>通过计算属性化简模板方法-------------{{ count }}</div>
    <div>通过mapState映射所需方法--------{{ age }}</div>
    <hr>
    <!-- 原始方法 -->
    <h3>同步</h3>
    <button @click="$store.commit('add')">+1</button>
    <button @click="$store.commit('addNum', 10)">+N</button>
    <button @click="add">+1</button>
    <button @click="addNum(10)">+N</button>
    <hr>
    <h3>异步</h3>
    <!-- 原始方法 -->
    <button @click="$store.dispatch('addSync')">+1 async</button>
    <button @click="addSync">+1 async</button>
    <!-- 传参z -->
    <button @click="$store.dispatch('addNsync',10)">+N async</button>
    <button @click="addNsync(10)">+N async</button>
    <hr>
    <h3>计算属性</h3>
    <div>{{ $store.getters.showCount }}</div>
    <div>{{ showCount }}</div>
    <hr>
    <h3>模块化</h3>
    <div>token为：{{ $store.state.test.token }}</div>
    <!-- 调用必须加模块名/方法名 -->
    <button @click="$store.commit('test/setToken','abc')">setToken</button>
    <hr>
    <svg-icon icon-class="tree" class-name="color-red"></svg-icon>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['showCount']),
    // 通过mapState映射所需批量生成
    ...mapState(['count', 'age']),
    // 通过计算属性化简模板
    count() {
      return this.$store.state.count
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['add', 'addNum']),
    ...mapActions(['addSync', 'addNsync'])
  }
}
</script>

<style scoped>
.color-red{
  color: red;
  font-size: 200px;
}
</style>
