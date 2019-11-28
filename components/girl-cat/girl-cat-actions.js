export const GIRL_CAT_ENABLED = 'GIRL_CAT_ENABLED';
export const GIRL_CAT_BTN_DISABLED = 'GIRL_CAT_BTN_DISABLED';

export const enableGirlCat = index => ({
  type: GIRL_CAT_ENABLED,
  index
});

export const disableGirlCatBtn = (girlId, catId) => ({
  type: GIRL_CAT_BTN_DISABLED,
  payload: {
    girlId,
    catId
  }
});
