const setErrorState = (state, { payload }) => {
  state.status = 'Error loading data!';
  state.error = payload;
};

const setFetchingState = (state) => {
  state.status = 'loading';
  state.error = null;
};

export { setErrorState, setFetchingState };
