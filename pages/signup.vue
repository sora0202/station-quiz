<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="5" lg="8" md="9" sm="10" xs="12">
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="10" sm="10">
                  <v-text-field v-model="email" label="Eメールアドレス" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="10" sm="10">
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="パスワード"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="10" sm="10">
                  <v-text-field
                    v-model="passwordConfirm"
                    type="password"
                    label="パスワード確認"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="10" sm="10">
                  <v-btn block class="mr-4 blue white--text" @click="signup">
                    アカウント作成
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import firebase from '~/plugins/firebase'

export default {
  components: {},
  data() {
    return {
      email: '' as string,
      password: '' as string,
      passwordConfirm: '' as string
    }
  },
  methods: {
    signup() {
      if (this.password !== this.passwordConfirm) {
        alert('incorrect password')
        return
      }

      this.$nuxt.$loading.start()
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
