<template>
  <v-row justify="center">
    <v-col xl="5" lg="7" md="9" sm="10" xs="12">
      <v-carousel
        v-if="isAnswering"
        v-model="qIndex"
        :hide-delimiters="true"
        :show-arrows="false"
        :height="1500"
        :light="true"
      >
        <v-carousel-item v-for="(q, index) in quiz" :key="index">
          <question-panel
            class="q-panel"
            :q="q"
            @answer="onAnswer"
            @next="onNext"
          ></question-panel>
        </v-carousel-item>
      </v-carousel>
      <result v-if="!isAnswering" :answers="answers"></result>
    </v-col>
  </v-row>
  <!-- <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      
    </v-flex>
  </v-layout> -->
</template>

<script lang="ts">
import axios from 'axios'
import { urls } from '~/assets/scripts/config'
import QuestionPanel from '~/components/QuestionPanel.vue'
import Result from '~/components/Result.vue'
import loadingMixin from '~/mixins/loadingMixin'
import { Quiz } from '~/interfaces/Quiz'
import { Answer, AnswerListElement } from '~/interfaces/Answer'

export default {
  components: {
    QuestionPanel,
    Result
  },
  mixins: [loadingMixin],
  async asyncData(context: any) {
    const questionNum: number = Number(context.query.questions)
    const res = await axios.get(urls.baseUrl + '/quiz?count=' + questionNum)
    const quiz: Quiz[] = res.data as Quiz[]

    return {
      quiz,
      isAnswering: true,
      questionNum
    }
  },
  data() {
    return {
      qIndex: 0,
      isAnswering: false,
      questionNum: 0,
      answers: [] as AnswerListElement[]
    }
  },
  methods: {
    onAnswer(answer: Answer, isCorrect: Boolean) {
      this.answers.push({ answer, isCorrect })
    },
    onNext() {
      if (this.qIndex + 1 === this.questionNum) {
        this.isAnswering = false
      }
      this.qIndex++
    }
  }
}
</script>
<style lang="scss"></style>
