<script>
import { DogsRepository } from '@/repositories/dogsRepository';
import { isAFunction } from '@/utils/helpers';

export default {
  name: 'DogsDataProvider',
  props: {
    transformItems: {
      type: Function,
      default: undefined
    },
    immediate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: null,
      error: null,
      isLoading: false
    };
  },
  created () {
    if (this.immediate) {
      this.fetch();
    }
  },
  computed: {
    computedData () {
      if (isAFunction(this.transformItems)) {
        return this.transformItems(this.data);
      }

      return this.data;
    }
  },
  methods: {
    async fetch (uri = this.uri) {
      try {
        this.isLoading = true;
        const response = await DogsRepository.getDogs();
        this.data = await response.json();

        return this.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  },
  render () {
    return this.$scopedSlots.default({
      data: this.computedData,
      error: this.error,
      loading: this.isLoading,
      fetch: this.fetch
    });
  }
};
</script>
