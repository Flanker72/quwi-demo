<template>
  <div
    class="
      q-login-page q-flex
      q-fill_all
      q-flex-align_center
      q-flex-justify_center
    "
  >
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form class="q-login-page__form" @submit.prevent="handleSubmit(login)">
        <div class="q-login-page__label q-margin-bottom_m q-font-weight_medium">
          Login
        </div>
        <q-input
          class="q-margin-bottom_m"
          placeholder="Email"
          v-model="form.email"
          rules="required|email"
          type="email"
          label="email"
        ></q-input>
        <q-input
          class="q-margin-bottom_m"
          placeholder="Password"
          v-model="form.password"
          rules="required"
          type="password"
          label="password"
        ></q-input>
        <q-button @click="handleSubmit(login)">Login</q-button>
      </form>
    </ValidationObserver>
  </div>
</template>

<style lang="less">
.q-login-page {
  &__form {
    width: 400px;
  }

  &__label {
    text-transform: uppercase;
  }
}
</style>

<script>
export default {
  auth: 'guest',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })
      } catch ({ response }) {
        switch (response.status) {
          case 417: {
            const errors = {}
            for (const key in response.data.first_errors) {
              errors[key] = [response.data.first_errors[key]]
            }
            this.$refs.form.setErrors(errors)
            break
          }
          case 404:
          case 401: {
            this.$refs.form.setErrors({
              email: [response.data.message],
            })
            break
          }
          default: {
            this.$refs.form.setErrors({
              email: ['Something went wrong, try again a moment later, please'],
            })
          }
        }
      }
    },
  },
}
</script>
