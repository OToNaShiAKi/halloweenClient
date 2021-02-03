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

export const Poem = async () => {
  try {
    const result = await axios.get("http://hustmaths.top/lantern-poets/poem.php");
    return result;
  } catch (error) {
    console.warn(error);
    return {};
  }
};

export const Over = async () => {
  try {
    await axios.get("/users/over");
  } catch (error) {
    console.warn(error);
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

