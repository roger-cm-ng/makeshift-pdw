// eslint-disable-next-line import/prefer-default-export
export const handleDefaults = (defaultObj, dynamicObj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in dynamicObj) {
    defaultObj[key] = dynamicObj[key];
  }
  return defaultObj;
};
