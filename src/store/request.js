import axios from "../plugins/axios";
import md5 from "blueimp-md5";

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
    info.lastest = new Date();
    info.crypto = md5(info.lastest.getTime() + 'hustmaths');
    const rank = await axios.post("/users/score", info);
    return rank;
  } catch (error) {
    console.warn(error);
  }
};

