const Account = (state, info) => {
  state.user = info;
};

const Notify = (state, message) => {
  state.notify = { show: true, message };
};

const Progress = (state, show) => {
  state.progress = show;
};

export default {
  Account,
  Notify,
  Progress,
};
