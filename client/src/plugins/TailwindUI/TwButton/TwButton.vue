<template>
  <component
    :is="tag"
    class="font-semibold py-2 px-4 border rounded shadow cursor"
    :class="computedClasses"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
import themeableMixin from './../mixins/themeableMixin';
export default {
  name: 'TwButton',
  mixins: [themeableMixin()],
  props: {
    tag: {
      type: String,
      // button, a, router-link...
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClasses () {
      return [
        { 'bg-blue-500 hover:bg-blue-700 text-white border-blue-400': this.variant === 'primary' },
        { 'bg-white hover:bg-gray-100 text-gray-800 border-gray-400': this.variant === 'default' },
        { 'opacity-50 cursor-not-allowed focus:outline-none': this.disabled }
      ];
    }
  }
};
</script>
