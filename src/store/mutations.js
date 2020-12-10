const Account = (state, info) => {
  state.user = info;
};

const Bless = (state, { bless, present }) => {
  state.bless = bless;
  state.present = present;
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
