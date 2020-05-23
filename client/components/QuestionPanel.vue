<template>
  <v-card>
    <v-card-text>
      <v-progress-circular
        :rotate="-90"
        :size="70"
        :width="5"
        :value="remainingTime_sec * 10"
        color="primary"
        id="timer"
      >
        {{ remainingTime_sec }}
      </v-progress-circular>
      <div class="question-container">
        <v-row>
          <v-col>
            <div>
              <span class="station-name display-2">
                {{ question.station_name }}
              </span>
              駅は何線の駅でしょうか。
            </div>
          </v-col>
        </v-row>
        <v-row> </v-row>
      </div>

      <v-row>
        <v-col align="center">
          <div v-if="!isAnswered" class="choices answer center">
            <v-radio-group v-model="selected" class="choice" row>
              <v-radio
                v-for="(c, index) in choice.choice"
                :key="index"
                :label="c.line_name"
                :index="index"
              ></v-radio>
            </v-radio-group>
          </div>
          <div v-if="isAnswered" class="answer">
            <div v-if="isCorrect">
              <div class="center">
                <img src="/pictures/animal_quiz_neko_maru.png" />
              </div>
              <div class="explanation">
                {{ question.station_name }}は、
                <span class="answer-word amber--text text--darken-4">{{
                  answer.answer.line_name
                }}</span>
                の駅です。
              </div>
            </div>
            <div v-if="!isCorrect">
              <div class="center">
                <img src="/pictures/animal_quiz_neko_batsu.png" />
              </div>
              <div class="explanation">
                {{ question.station_name }}は、
                <span class="answer-word amber--text text--darken-4">{{
                  rightAnswer.line_name
                }}</span>
                の駅です。
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row justify="end">
        <v-col> </v-col>
        <v-col align="end">
          <v-btn
            v-if="!isAnswered"
            class="button"
            color="primary"
            @click="onAnswer"
          >
            <v-icon>mdi-pencil</v-icon>回答する
          </v-btn>
          <v-btn
            v-if="isAnswered"
            class="button"
            color="primary"
            @click="onNext"
          >
            <v-icon>mdi-chevron-right</v-icon>次の問題へ
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axios from 'axios'
import { PropType } from 'vue'
import { urls } from '../assets/scripts/config'
import Station from '../interfaces/Station'
import Line from '~/interfaces/Line'
import { Quiz, Choice } from '~/interfaces/Quiz'
import { Answer } from '~/interfaces/Answer'

export default {
  props: {
    q: Object as PropType<Quiz>
  },
  computed: {
    isTimeUp() {
      return this.remainingTime_sec === 0
    }
  },
  data() {
    const question: Station = this.q.question
    const choice: Choice = this.q.choice

    return {
      timer: null,
      isAnswered: false,
      isCorrect: false,
      answer: {} as Answer,
      rightAnswer: {} as Line,
      selected: 0,
      choice,
      question,
      remainingTime_sec: 10 as number
    }
  },
  watch: {
    isTimeUp(v) {
      if (!v) {
        return
      }
      this.onAnswer()
    }
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.remainingTime_sec -= 1
      }, 1000)
    },
    async onAnswer() {
      console.log(this.timer)
      clearInterval(this.timer)
      this.answer = {
        question: this.question,
        answer: this.choice.choice[this.selected]
      }
      // 回答の保存&正否の問い合わせ開始
      this.$nuxt.$loading.start()
      const res = await axios.post(urls.baseUrl + '/answer', this.answer)
      this.isCorrect = res.data.is_correct
      this.rightAnswer = res.data.answer
      this.$emit('answer', this.answer, this.isCorrect)
      this.isAnswered = true
      this.$nuxt.$loading.finish()
    },
    onNext() {
      this.$emit('next')
    }
  }
}
</script>

<style lang="scss">
#timer {
  position: absolute;
  top: 50px;
}
#circle-icon {
  font-size: 120px;
  color: palevioletred;
}
.question-container {
  padding: 1.3em 0.8em 1em 0.8em;
  color: rgba(50, 50, 50, 0.8);
  background: white;
  border-top: solid 10px #00695c;
  box-shadow: 0 5px 5px rgba(255, 255, 255, 0.32);
  text-align: center;
  font-size: 1.2em;
}
.question {
  padding: 1.3em 0.8em 1em 0.8em;
  color: rgba(50, 50, 50, 0.8);
  background: white;
  border-top: solid 10px #00695c;
  box-shadow: 0 5px 5px rgba(255, 255, 255, 0.32);
  text-align: center;
  font-size: 1.2em;
}
.center {
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
}
.explanation {
  padding: 1em 0.8em;
}
.button {
  margin-right: 0.8em;
}
.answer {
  padding: 1em 0.8em 0.8em 0.8em;
  color: rgba(50, 50, 50, 0.8);
  background: white;
  border-bottom: solid 10px #00695c;
  box-shadow: 0 5px 5px rgba(255, 255, 255, 0.32);
  text-align: center;
  font-size: 1.2em;
}
.answer-word {
  font-size: 2.5em;
}
</style>
