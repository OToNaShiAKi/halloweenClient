const Account = (state, info) => {
  state.user = info;
};

const Bless = (state, bless) => {
  state.bless = bless;
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
  Bless,
};
