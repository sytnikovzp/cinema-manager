export const setError = (state, {payload}) => {
    state.error = payload;
    state.status = 'rejected';
}

export const setStatus = (state) => {
    state.error = null;
    state.status = 'pending';
}