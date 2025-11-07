import axios from "../../api/axiosconfig";
import { loadproduct } from "../reducers/productSlice";

export const asyncloadproducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products/");
    dispatch(loadproduct(data));
  } catch (error) {
    console.log(error);
  }
};
