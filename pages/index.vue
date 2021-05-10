<template>
  <div class="q-home-page q-flex q-flex-justify_center">
    <div class="q-home-page__error">{{ error }}</div>

    <div class="q-home-page__projects q-margin-vertical_xl">
      <nuxt-link
        :to="`/project/${item.id}`"
        class="
          q-home-page__projects-item
          q-margin-bottom_l
          q-padding_xl
          q-flex
          q-flex-align_center
        "
        v-for="item in projects"
        :key="item.id"
      >
        <div class="q-home-page__projects-item__logo q-flex-shrink_0">
          <img
            class="q-home-page__projects-item__logo-img"
            :src="item.logo_url || '/images/no_logo.png'"
          />
        </div>
        <div
          class="
            q-home-page__projects-item__title
            q-flex-grow_1
            q-font-weight_bold
            q-padding-horizontal_l
          "
        >
          {{ item.name }}
        </div>
        <div
          class="
            q-home-page__projects-item__status
            q-flex-shrink_0
            q-font-weight_bold
            q-padding-horizontal_l
          "
          :class="`q-home-page__projects-item__status_${
            item.is_active ? 'active' : 'inactive'
          }`"
        >
          {{ item.is_active ? 'Active' : 'Inactive' }}
        </div>
        <div class="q-home-page__projects-item__time q-flex-shrink_0">
          <div
            class="
              q-flex
              q-flex-justify_space-between
              q-flex-align_center
              q-margin-bottom_s
            "
          >
            <div>time this week</div>
            <div class="q-font-weight_bold">00:00:00</div>
          </div>
          <div
            class="
              q-flex
              q-flex-justify_space-between
              q-flex-align_center
              q-margin-bottom_s
            "
          >
            <div>this month</div>
            <div class="q-font-weight_bold">00:00:00</div>
          </div>
          <div class="q-flex q-flex-justify_space-between q-flex-align_center">
            <div>total</div>
            <div class="q-font-weight_bold">00:00:00</div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="less">
.q-home-page {
  &__projects {
    width: 1000px;

    &-item {
      background-color: var(--white-color);
      border-radius: 10px;
      border: 1px solid var(--q-input-border-color);
      text-decoration: none;
      color: var(--black-color);

      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      }

      &__logo {
        &-img {
          object-fit: contain;
          width: 80px;
          height: 80px;
        }
      }

      &__title {
        -webkit-line-clamp: 3;
      }

      &__status {
        width: 150px;

        &_active {
          color: var(--green-color);
        }
        &_inactive {
          color: var(--grey-color);
        }
      }

      &__time {
        width: 240px;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      projects: [],
      error: null,
    }
  },

  async asyncData({ $axios }) {
    const result = {
      projects: [],
      error: null,
    }

    try {
      const { projects } = await $axios.$get('projects-manage/index')
      result.projects = projects
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
}
</script>
