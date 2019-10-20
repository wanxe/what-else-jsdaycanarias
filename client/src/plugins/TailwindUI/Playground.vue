<template>
  <div class="container p-4">
    <div class="flex justify-around mb-10">
      <tw-button class="mr-2">
        Default button
      </tw-button>

      <tw-button class="mr-2" variant="primary">
        Primary button
      </tw-button>

      <tw-button class="mr-2" disabled>
        Disabled button
      </tw-button>

      <tw-button
        class="mr-2"
        tag="a"
        href="/"
      >
        Href link as button
      </tw-button>
    </div>

    <div class="flex flex-col mb-10">
      <label class="font-bold mb-2" for="input">
        Tw Input
      </label>
      <tw-input id="input" />
    </div>

    <div class="flex flex-col mb-10">
      <label class="font-bold mb-2" for="input">
        Tw Input append
      </label>
      <tw-input id="input">
        <template #append>
          <span class="px-5 font-bold bg-gray-200 rounded-tr-lg rounded-br-lg flex items-center ">€</span>
        </template>
      </tw-input>
    </div>

    <div class="flex flex-col mb-10">
      <label class="font-bold mb-2" for="input">
        Tw Input prepend
      </label>
      <tw-input id="input">
        <template #prepend>
          <span class="px-5 font-bold bg-gray-200 rounded-tl-lg rounded-bl-lg flex items-center ">$</span>
        </template>
      </tw-input>
    </div>

    <div class="flex flex-col">
      <label for="autocomplete" class="font-bold mb-2">
        Tw Autocomplete
      </label>
      <tw-autocomplete id="autocomplete" :items="mockData">
        <template #result="{ cursor, item, isSelected, highlight }">
          <tw-autocomplete-item
            :class="{ 'border-solid border-2 border-gray-600': isSelected }"
            class="border-solid border-2 hover:border-gray-600 cursor-pointer"
          >
            {{ item }}
          </tw-autocomplete-item>
        </template>
      </tw-autocomplete>
    </div>
  </div>
</template>

<script>
import { TwButton } from './TwButton';
import { TwAutocomplete, TwAutocompleteItem } from './TwAutocomplete';
import { TwInput } from './TwInput';

// TODO Task-4: remove all these imports and the components from this instance and
// check if your plugin is working

export default {
  name: 'Playground',
  components: {
    TwButton,
    TwAutocomplete,
    TwAutocompleteItem,
    TwInput
  },
  data () {
    return {
      mockData: ['item 1', 'item 2']
    };
  }
};
</script>
