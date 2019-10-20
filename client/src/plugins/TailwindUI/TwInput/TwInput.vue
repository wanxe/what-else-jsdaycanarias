<template>
  <div class="tw-input shadow-md flex align-middle rounded-lg">
    <slot name="prepend" />
    <input
      class="w-full rounded-lg text-xl text-gray-600 px-4 py-3 outline-none"
      ref="input"
      :class="computedClasses"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="listeners"
      v-model="internalValue"
    >
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'TwInput',
  inheritAttrs: false,
  props: {
    value: {
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lazyValue: this.value
    };
  },
  computed: {
    listeners () {
      // ⚠️ Pass all events but the input event
      const listeners = { ...this.$listeners };
      delete listeners.input;

      return listeners;
    },
    computedClasses () {
      return [
        { 'rounded-tl-none rounded-bl-none': this.$slots.prepend },
        { 'rounded-tr-none rounded-br-none': this.$slots.append },
        { 'bg-gray-200': this.disabled }
      ];
    },
    internalValue: {
      get () {
        return this.lazyValue;
      },
      set (val) {
        this.lazyValue = val;
        this.$emit('input', val);
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.lazyValue = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.tw-input {
  input {
    transition: background-color .3s ease;
  }
}
</style>
