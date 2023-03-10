import axios from "axios";
import { API_HOST } from "../../api_utils";

export const TYPES = {
  LIST_PAGE_REQUEST_SEND: "LIST_PAGE_REQUEST_SEND",
  LIST_PAGE_REQUEST_ERROR: "LIST_PAGE_REQUEST_ERROR",
  LIST_PAGE_REQUEST_SUCCESS: "LIST_PAGE_REQUEST_SUCCESS",

  CREATE_PAGE_REQUEST: "CREATE_PAGE_REQUEST",
  CREATE_PAGE_ERROR: "CREATE_PAGE_ERROR",
  CREATE_PAGE_SUCCESS: "CREATE_PAGE_SUCCESS",
};

export const pageLoad = () => async (dispatch) => {
  dispatch({ type: TYPES.LIST_PAGE_REQUEST_SEND });

  try {
    console.log("getting pages... | user_id = " + localStorage.getItem('web_builder_user_id'));
    const response = await axios.get(`${API_HOST}pages/user/${localStorage.getItem("web_builder_user_id")}`);
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_SUCCESS, data: response.data });
  } catch (error) {
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_ERROR, error: error });
  }
};

export const createPage = (name) => async (dispatch) => {
  dispatch({ type: TYPES.CREATE_PAGE_REQUEST });
  try {
    const response = await axios.post(`${API_HOST}pages/`, {
      name,
      user: localStorage.getItem("web_builder_user_id")
    });
    dispatch({ type: TYPES.CREATE_PAGE_SUCCESS, data: response.data });
  } catch (error) {
    dispatch({ type: TYPES.CREATE_PAGE_ERROR, data: error });
  }
};
