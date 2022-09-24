import PageTools from './PageTool/PageTools.vue'
import UploadExcel from './UploadExcel/index.vue'
export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
