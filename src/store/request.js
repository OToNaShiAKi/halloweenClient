import axios from "../plugins/axios";

export const Rank = async () => {
  try {
    const result = await axios.get("/users/rank");
    return result;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export const GameOver = async (info) => {
  try {
    info.date = new Date();
    const rank = await axios.post("/users/score", info);
    return rank;
  } catch (error) {
    console.warn(error);
  }
};

