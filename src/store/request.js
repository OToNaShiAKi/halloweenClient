import axios from "../plugins/axios";
import router from "./../router/";

export const Birthday = async (present) => {
  try {
    await axios.post("/users/birthday", { present });
    router.replace("/");
  } catch (error) {
    console.warn(error);
  }
};
