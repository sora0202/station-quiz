<template>
  <v-card>
    <v-container fluid class="container">
      <v-row>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>正解</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(answer, index) in answers" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ answer.isCorrect ? '○' : '×' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="end">
          <span class="display-1">{{ answers.length }} 問</span>中、
          <span class="display-1 red--text">{{ correctNum }}問</span>正解
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Pie } from 'vue-chartjs'
import * as _ from 'lodash'
import { AnswerListElement } from '~/interfaces/Answer'

// TODO: 列幅指定
// https://gray-code.com/html_css/setting-size-for-cell-of-table/
export default {
  extends: Pie,
  props: {
    answers: Array as PropType<AnswerListElement[]>
  },
  data() {
    const correctNum: number = _.filter(
      this.answers,
      (e: AnswerListElement) => e.isCorrect
    ).length

    return {
      correctNum
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss"></style>
