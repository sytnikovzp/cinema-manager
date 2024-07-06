export const setError = (state, { payload }) => {
  state.status = 'Error loading data!';
  state.error = payload;
};

export const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};
