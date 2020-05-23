<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="5" lg="8" md="9" sm="10" xs="12">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col>
                  <v-alert v-if="error" type="error">
                    {{ error }}
                  </v-alert>
                </v-col>
              </v-row>
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
                  <v-btn
                    block
                    class="mr-4 blue white--text"
                    @click="onClickLoginBtn"
                  >
                    ログイン
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
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions(['setUser', 'login']),
    async onClickLoginBtn() {
      try {
        this.error = null
        const user = await this.login({
          email: this.email,
          password: this.password
        })
        this.setUser(user)
        this.$router.push('/')
      } catch (error) {
        this.error = error
      }
    }
  }
}
</script>
