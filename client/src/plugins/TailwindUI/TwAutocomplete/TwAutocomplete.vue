<template>
  <div
    class="tw-dropdown w-full max-w-screen-xl mx-auto relative focus:outline-none"
    @keyup.self.esc="closeDropdown"
    @keydown.self.down.prevent="onInputKeyDown"
    @keydown.self.up.prevent="onInputKeyUp"
    @keypress.enter.prevent.stop.self="onInputKeyEnter"
    :tabindex="tabindex"
  >
    <tw-input
      v-model="inputValue"
      ref="search"
      type="search"
      class="mb-4"
      :tabindex="tabindex + 1"
      @blur.self="onInputBlur"
      @search="onNativeSearchEvent"
      @focus.self="activate"
      @keyup.self.esc="closeDropdown"
      @keydown.space.prevent.stop
      @keydown.self.down.prevent="onInputKeyDown"
      @keydown.self.up.prevent="onInputKeyUp"
      @keypress.enter.prevent.stop.self="onInputKeyEnter"
      :class="computedClass"
      :aria-expanded="isDropdownOpened"
      :placeholder="placeholder"
      :disabled="loading || disabled"
    >
      <template #prepend>
        <button
          class="bg-white w-auto flex justify-end items-center rounded-lg rounded-tr-none rounded-br-none focus:outline-none"
          @click="onClickSearchButton"
        >
          <svg
            class="fill-current text-gray-500 hover:text-blue-900 inline-block h-8 w-12"
            :class="{ 'text-blue-900': isFocused }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
          </svg>
        </button>
      </template>
    </tw-input>

    <transition name="slide-top" mode="out-in">
      <div
        v-show="isDropdownOpened"
        class="tw-dropdown--items rounded"
      >
        <template v-if="computedItems.length">
          <div
            v-for="(item, index) in computedItems"
            :key="item"
            :class="{ 'is-selected': cursor === index }"
            :tabindex="(index + 1) + (tabindex + 2)"
            class="focus:outline-none"
            @focus="setCursorIndexFromDropdownItem($event, index)"
            @blur="onBlurDropdownItem($event)"
            @click="selectItem(item)"
            @keypress.enter.prevent.stop.self="onInputKeyEnter"
          >
            <slot
              name="result"
              v-bind="{
                cursor,
                item,
                isSelected: cursor === index,
                highlight
              }"
            />
          </div>
        </template>

        <template v-else>
          <slot name="no-result">
            No results...
          </slot>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import { isAFunction } from '@/utils/helpers';
import { throttle } from '@/utils/throttle';
import TwInput from '../TwInput/TwInput.vue';
export default {
  name: 'TwAutocomplete',
  components: {
    TwInput
  },
  props: {
    tabindex: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Search...'
    },
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterItems: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      inputValue: null,
      isFocused: false,
      cursor: -1,
      isDropdownOpened: false
    };
  },
  watch: {
    inputValue (newValue, oldValue) {
      const hasValue = !!newValue;
      this.cursor = -1;
      if (!hasValue) {
        return this.deactivate();
      }

      if (newValue !== oldValue) {
        return this.activate();
      }
    }
  },
  computed: {
    computedItems () {
      const notEmpty = !!this.inputValue;
      if (notEmpty) {
        if (isAFunction(this.filterItems)) {
          return this.filterItems(this.items, this.inputValue);
        }
      }

      return this.items;
    },
    computedClass () {
      return [
        { 'shadow-outline rounded-lg': this.isFocused }
      ];
    }
  },
  methods: {
    activate () {
      this.isFocused = true;
      if (this.isDropdownOpened || this.disabled) return;
      // Waits until the component is fully rendered into the DOM and
      // hooks into the native wrapped input element
      this.$nextTick(() => this.$refs.search && this.$refs.search.$refs.input.focus());
      this.isDropdownOpened = true;
    },
    deactivate () {
      if (!this.isDropdownOpened) return;
      // Hooks into the native wrapped input element
      this.$refs.input && this.$refs.search.$refs.input.blur();
      this.closeDropdown();
      this.isFocused = false;
    },
    onClickSearchButton () {
      this.activate();
    },
    onNativeSearchEvent () {
      this.inputValue = null;
      this.$emit('selected', null);
    },
    closeDropdown () {
      this.isDropdownOpened = false;
      this.cursor = -1;
    },
    highlight (name) {
      const notEmpty = !!this.inputValue;
      if (notEmpty) {
        return name.replace(new RegExp(this.inputValue, 'gi'), match => {
          return `<mark class="bg-yellow-500 underline">${match}</mark>`;
        });
      }

      return name;
    },
    onInputKeyDown: throttle(function () {
      if (this.isDropdownOpened) {
        if (this.cursor < this.computedItems.length - 1) {
          this.cursor++;
          const el = this.$el.querySelector('.is-selected');
          this.scrollToElement(el);
        }
      }
    }, 120),
    onInputKeyUp: throttle(function () {
      if (this.isDropdownOpened) {
        if (this.cursor > 0) {
          this.cursor--;
          const el = this.$el.querySelector('.is-selected');
          this.scrollToElement(el);
        }
      }
    }, 120),
    onInputKeyEnter () {
      if (this.cursor > -1) {
        const selectedItem = this.computedItems[this.cursor];
        return this.selectItem(selectedItem);
      }
      this.selectItem(null);
    },
    selectItem (item) {
      const alreadySelected = this.input === item;
      if (!item || alreadySelected) return;
      this.inputValue = item;
      this.$emit('selected', item);
      this.closeDropdown();
    },
    scrollToElement (element) {
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    },
    onInputBlur ({ relatedTarget }) {
      this.isFocused = false;
      if (!relatedTarget) {
        this.closeDropdown();
      }
    },
    setCursorIndexFromDropdownItem (e, index) {
      this.cursor = index;
    },
    onBlurDropdownItem (e) {
      const inputFocusedOnTab = e.relatedTarget && e.relatedTarget.tagName;
      if (inputFocusedOnTab) {
        this.cursor = -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tw-dropdown {
  transition: all .3s ease;
  &--items {
    position: relative;
    max-height: 332px;
    overflow-y: scroll;
    z-index: 0;
    position: absolute;
    width: 100%;
    top: 72px;
    left: 0;
  }
}
</style>
