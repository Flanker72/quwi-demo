<template>
  <div>
    <ValidationProvider :name="label" :rules="rules" v-slot="{ errors }">
      <div
        class="q-input"
        :class="{
          'q-input_error': errors && errors.length,
          'q-input_active': active,
        }"
      >
        <input
          class="q-input__field"
          :placeholder="placeholder"
          v-model="internalValue"
          @focus="active = true"
          @blur="active = false"
          :type="type"
        />
      </div>
      <span class="q-input__validation">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<style lang="less">
.q-input {
  border: 1px solid var(--q-input-border-color);
  border-radius: 2px;
  background-color: var(--q-input-background-color);

  &:hover,
  &_active {
    border: 1px solid var(--q-input-border-color-hover);
  }

  &_error {
    border: 1px solid var(--q-input-border-color-error);
  }

  &__field {
    border: none;
    outline: none;
    width: 100%;
    padding: 6px 8px;
    box-sizing: border-box;

    &::placeholder {
      color: var(--q-input-placeholder-color);
    }
  }

  &__validation {
    font-size: var(--font-size-s);
    color: #ff0000;
  }
}
</style>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    label: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
    },

    value: {
      type: String,
    },

    type: {
      type: String,
      default: 'text',
    },

    rules: {
      type: String,
    },
  },

  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },

  data() {
    return {
      active: false,
    }
  },
}
</script>
