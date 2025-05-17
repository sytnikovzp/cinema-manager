export const setErrorState = (state, { payload }) => {
  state.status = 'Error loading data!';
  state.error = payload;
};

export const setFetchingState = (state) => {
  state.status = 'loading';
  state.error = null;
};
