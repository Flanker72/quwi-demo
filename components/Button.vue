<template>
  <div
    class="q-button q-padding-vertical_s q-padding-horizontal_xl q-font-size_s"
    :class="[`q-button_${variant}`, { 'q-button_disabled': disabled }]"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<style lang="less">
.q-button {
  display: inline-block;
  border-radius: 3px;
  text-transform: uppercase;
  cursor: pointer;

  &_primary {
    color: var(--white-color);
    background-color: var(--primary-color);

    &:hover {
      background-color: var(--primary-color-darken);
    }
  }

  &_secondary {
    color: var(--black-color);
    background-color: var(--secondary-color);

    &:hover {
      background-color: var(--secondary-color-darken);
    }
  }

  &_disabled {
    cursor: default;
    opacity: 0.4;
  }
}
</style>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
