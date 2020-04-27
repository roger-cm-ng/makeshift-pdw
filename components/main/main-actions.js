export const COMPONENT_ENABLED_SPINNER = 'COMPONENT_ENABLED_SPINNER';
export const COMPONENT_DISABLED_SPINNER = 'COMPONENT_DISABLED_SPINNER';

export const enableSpinner = item => ({
  type: COMPONENT_ENABLED_SPINNER,
  item
});

export const disableSpinner = item => ({
  type: COMPONENT_DISABLED_SPINNER,
  item
});
