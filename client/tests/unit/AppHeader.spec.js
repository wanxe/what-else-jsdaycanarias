import { shallowMount } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader';

describe('AppHeader.vue', () => {
  it('should be a vue instance', () => {
    const wrapper = shallowMount(AppHeader);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
