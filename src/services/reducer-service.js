export const setError = (state, { payload }) => {
  state.error = payload;
  state.status = 'Error loading data!';
};

export const setStatus = (state) => {
  state.error = null;
  state.status = null;
};
