<template>
    <hamburger v-model="isCollapse" :is-active="isCollapse" @toggleClick="toggleSideBar" />
<el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
      <el-menu-item index="/dashboard">dashboard</el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Hamburger
  },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSideBar (state) {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
