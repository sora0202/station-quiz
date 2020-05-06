<template>
  <v-layout column justify-center align-center>
    <v-card>
      <v-card-title>
        <div class="display-3">駅名クイズ</div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="description">
              駅名をもとに、それがどの路線のものか当ててもらうクイズです。<br />
              1問あたりの制限時間は10秒です。問題数は下記から選ぶことができます。
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select v-model="selected" :items="questions" label="問題数">
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row
          ><v-col align="end">
            <v-btn @click="onClickQuizStartBtn">
              クイズを始める
            </v-btn></v-col
          ></v-row
        >
      </v-card-actions>
    </v-card>
  </v-layout>
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

<style lang="scss"></style>
