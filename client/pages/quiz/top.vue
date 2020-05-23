<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <div class="display-3">駅名クイズ</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        駅名をもとに、それがどの路線のものか当ててもらうクイズです。<br />
        1問あたりの制限時間は10秒です。問題数は下記から選ぶことができます。
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <v-select v-model="selected" :items="questions" label="問題数">
        </v-select>
      </v-col>
      <v-col cols="2"
        ><v-btn id="start-btn" color="primary" @click="onClickQuizStartBtn">
          クイズを始める
        </v-btn></v-col
      >
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      questions: [5, 10, 20],
      selected: 10
    }
  },
  methods: {
    onClickQuizStartBtn() {
      this.$router.push('/quiz/questions?questions=' + this.selected)
    }
  }
}
</script>

<style lang="scss">
#start-btn {
  margin-top: 10px;
}
</style>
