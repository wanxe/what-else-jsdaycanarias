import '@/assets/css/tailwind.css';
import '@/assets/css/transitions.scss';
import * as Autocomplete from './TwAutocomplete';
import { TwInput } from './TwInput';
import { TwButton } from './TwButton';

const TailwindUI = {
  ...Autocomplete,
  TwInput,
  TwButton
};

TailwindUI.install = (Vue, options = {}) => {
  for (const component of Object.values(TailwindUI)) {
    component.name.length && Vue.component(component.name, component);
  }
};

export default TailwindUI;
