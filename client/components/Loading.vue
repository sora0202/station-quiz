<template>
  <div v-if="loading" class="loading">
    <div>
      <v-progress-circular indeterminate color="red" :size="70" />
    </div>
    <div id="preparing">
      準備中...
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
#preparing {
  color: #fff;
  margin-left: 15px;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  background-color: rgba(#000, 0.2);
}
</style>
