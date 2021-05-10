<template>
  <div
    class="q-layout q-fill_height"
    :class="{ 'q-layout_guest': !$auth.loggedIn }"
  >
    <div
      class="
        q-layout__topbar
        q-flex
        q-flex-align_center
        q-padding-horizontal_xl
      "
      v-if="$auth.loggedIn"
    >
      <div class="q-layout__topbar-logo">Q</div>
      <div class="q-flex-grow_1"></div>
      <nuxt-link to="/" class="q-layout__topbar-item">Projects</nuxt-link>
      <div
        @click.prevent="logout()"
        class="q-layout__topbar-item q-margin-left_l"
      >
        Logout
      </div>
    </div>
    <div class="q-fill_height q-layout__content">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="less">
.q-layout {
  padding-top: 60px;

  &_quest {
    padding-top: 0;
  }

  &__topbar {
    border-bottom: 2px solid var(--q-layout-topbar-border-bottom-color);
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    background-color: var(--background-color);

    &-logo {
      font-size: 40px;
      font-weight: bold;
      color: var(--black-color);
      text-decoration: none;
    }

    &-item {
      text-transform: uppercase;
      color: var(--q-layout-topbar-item-color);
      text-decoration: none;
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-medium);
      cursor: pointer;

      &:hover {
        color: var(--q-layout-topbar-item-color-hover);
      }
    }
  }
}
</style>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.dir(err)
      }
    },
  },
}
</script>
