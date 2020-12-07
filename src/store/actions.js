import router from "./../router/";
import axios from "./../plugins/axios";
import { setItem } from "./../plugins/storage";

const Account = async ({ commit }, info) => {
  try {
    const result = await axios.post("/users/account", info);
    setItem("user", info);
    commit("Account", result.data);
    const name = router.history.current.name;
    if (name === "Login") router.replace("/");
  } catch (error) {
    console.warn(error);
  }
};

const Info = async ({ commit }, info) => {
  try {
    const result = await axios.post("/users/info", info);
    commit("Info", result.data);
  } catch (error) {
    console.warn(error);
  }
};

export default { Account, Info };
