<template>
  <div class="q-project-page q-flex q-flex-column q-flex-justify_center">
    <div
      class="q-project-page__toolbar q-flex q-flex-justify_center q-padding_m"
    >
      <div class="q-project-page__toolbar-inner">
        <q-button variant="secondary" @click="$router.push('/')">Back</q-button>
      </div>
    </div>
    <div class="q-flex q-flex-justify_center q-margin-vertical_l">
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form class="q-project-page__form" @submit.prevent="handleSubmit(save)">
          <div class="q-padding_l">
            <div class="q-project-page__form-field q-flex q-flex-align_center">
              <div class="q-project-page__form-field__label q-margin-right_l">
                Name
              </div>
              <q-input
                class="q-project-page__form-field__input q-margin-right_l"
                v-model="project.name"
                placeholder="Name"
                label="name"
                rules="required"
              ></q-input>
              <q-button variant="primary" @click="handleSubmit(save)"
                >OK</q-button
              >
              <div
                class="
                  q-project-page__form-field__status
                  q-margin-left_l
                  q-font-size_s
                "
              >
                {{ status }}
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<style lang="less">
.q-project-page {
  &__toolbar {
    height: 60px;
    background: var(--toolbar-background-color);

    &-inner {
      width: 800px;
    }
  }

  &__form {
    width: 800px;
    background-color: var(--white-color);
    border-radius: 4px;
    border: 1px solid var(--q-input-border-color);

    &-field {
      &__label {
        width: 120px;
      }

      &__input {
        width: 400px;
      }

      &__status {
        color: var(--green-color);
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      project: {},
      status: null,
    }
  },

  async asyncData({ $axios, params }) {
    const result = {}

    try {
      const { project } = await $axios.$get(`/projects-manage/${params.id}`)
      result.project = project
    } catch ({ response }) {
      switch (response.status) {
        case 404:
        case 401: {
          result.error = response.data.message
          break
        }
        default: {
          result.error =
            'Something went wrong, try again a moment later, please'
        }
      }
    }

    return result
  },

  methods: {
    async save() {
      try {
        await this.$axios.$post(
          `/projects-manage/update?id=${this.project.id}`,
          {
            name: this.project.name,
          }
        )
        this.status = 'Saved'
        setTimeout(() => {
          this.status = null
        }, 2000)
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
              name: [response.data.message],
            })
            break
          }
          default: {
            this.$refs.form.setErrors({
              name: ['Something went wrong, try again a moment later, please'],
            })
          }
        }
      }
    },
  },
}
</script>
