import router from "./../router/";
import axios from "./../plugins/axios";
import { setItem } from "./../plugins/storage";

const Account = async ({ commit }, info) => {
  try {
    const result = await axios.post("/users/account", info);
    setItem("user", info);
    setItem("highest", result.highest);
    commit("Account", result);
    const name = router.history.current.name;
    name === "Login" && router.replace("/");
  } catch (error) {
    console.warn(error);
  }
};

const Info = async ({ commit }, info) => {
  try {
    const result = await axios.post("/users/info", info);
    commit("Account", result);
  } catch (error) {
    console.warn(error);
  }
};



export default { Account, Info };
