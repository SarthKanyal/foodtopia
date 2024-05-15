import React from "react";
import { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_AlERT,
  SETUP_USER_BEGIN,
  SUCCESS,
  ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  ADD_ITEM_BEGIN,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
  GET_ITEMS_BEGIN,
  GET_ITEMS_SUCCESS,
  EDIT_ITEM,
  EDIT_ITEM_BEGIN,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_ERROR,
  SET_ADD_ITEM,
  DELETE_ITEM_BEGIN,
  APPLY_FILTER,
  CLEAR_MYITEMS_FILTER,
  DONATE_ITEM_BEGIN,
  SET_DONATE_ITEM,
  CLEAR_PICKUP_DETAILS,
  DONATE_ITEM_SUCCESS,
  DONATE_ITEM_ERROR,
  CLAIM_ITEM_BEGIN,
  CLAIM_ITEM_SUCCESS,
  DISPLAY_DONATE_SUCCESS,
  SET_ITEM_DONATED,
} from "../context/actions";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

export const initialState = {
  //user states
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,

  //item states
  isEditing: false,
  editItemId: "",
  categoryOptions: ["Fruit", "Vegetable", "Dairy", "Non-perishable"],
  category: "",
  name: "",
  quantity: "",
  unitOptions: ["lb", "kg", "gm", "l", "ml", "units"],
  unit: "",
  expiresOn: "",
  pickupTime: "",
  pickupLocation: "",
  setDonateItem: "",
  itemDonated: false,
  itemClaimed: false,

  //all items states
  items: [],
  totalItems: 0,
  numPages: 1,
  page: 1,

  //filter states
  filterName: "",
  filterCategory: "",
  filterSort: "expiring soon-later",
  filterSortOptions: [
    "expiring later-soon",
    "expiring soon-later",
    "newest-oldest",
    "oldest-newest",
  ],
  filterPickupOptions: [
    "expiring later-soon",
    "expiring soon-later",
    "newest-oldest",
    "oldest-newest",
    "pickup soon",
    "pickup later",
  ],
  filterPickup: "pickup soon",
  isDonating: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const displayDonateSuccess = () => {
    dispatch({ type: DISPLAY_DONATE_SUCCESS });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_AlERT });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: SUCCESS,
        payload: {
          user: user,
          token: token,
          alertText: alertText,
        },
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      const payload = error.response.data.msg;
      dispatch({ type: ERROR, payload });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updateUser = async ({ name, email, lastName }) => {
    const currentUser = { name, email, lastName };

    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await authFetch.patch("/auth/updateUser", currentUser);

      const payload = {
        user: response.data.user,
        token: response.data.token,
        alertText: "Profile updated successfully",
      };

      dispatch({ type: SUCCESS, payload: payload });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      const payload = error.response.data.msg;
      dispatch({ type: ERROR, payload });
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    const payload = { name: name, value: value };
    dispatch({ type: HANDLE_CHANGE, payload: payload });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const addItem = async (currentItem) => {
    dispatch({ type: ADD_ITEM_BEGIN });

    try {
      const { status, name, category, quantity, unit, expiresOn } = currentItem;
      const response = await authFetch.post("/items", {
        status,
        name,
        category,
        quantity,
        unit,
        expiresOn,
      });
      console.log(state.isDonating);
      if (state.isDonating) {
        console.log("donating item after adding");
        const _id = response.data.item._id;
        await donateItem(_id);
      } else {
        dispatch({ type: ADD_ITEM_SUCCESS });
      }

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
      //dispatch({ type: ADD_ITEM_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const addAndDonate = async (currentItem) => {
    dispatch({ type: ADD_ITEM_BEGIN });

    try {
      const { status, name, category, quantity, unit, expiresOn } = currentItem;
      const response = await authFetch.post("/items", {
        status,
        name,
        category,
        quantity,
        unit,
        expiresOn,
      });
      const _id = response.data.item._id;
      await donateItem(_id);
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
      //dispatch({ type: ADD_ITEM_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const applyFilter = () => {
    dispatch({ type: APPLY_FILTER });
  };
  const clearMyItemsFilter = () => {
    dispatch({ type: CLEAR_MYITEMS_FILTER });
  };

  const getAllItems = async () => {
    const params = {
      name: state.filterName,
      category: state.filterCategory,
      sort: state.filterSort,
    };
    dispatch({ type: GET_ITEMS_BEGIN });

    try {
      const { data } = await authFetch.get("/items", { params: params });

      const { items, totalItems, numPages } = data;

      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: { items, totalItems, numPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditItem = async (itemId) => {
    dispatch({ type: EDIT_ITEM, payload: { itemId } });
  };

  const setAddItem = () => {
    dispatch({ type: SET_ADD_ITEM });
  };

  const deleteItem = async (_id) => {
    dispatch({ type: DELETE_ITEM_BEGIN });
    try {
      await authFetch.delete(`/items/${_id}`);
      getAllItems();
    } catch (error) {
      logoutUser();
    }
  };

  const editItem = async (currentItem) => {
    dispatch({ type: EDIT_ITEM_BEGIN });
    const { category, name, quantity, unit } = currentItem;
    try {
      const response = await authFetch.patch(`/items/${state.editItemId}`, {
        category,
        name,
        quantity,
        unit,
      });
      dispatch({ type: EDIT_ITEM_SUCCESS });
    } catch (error) {
      dispatch({ type: EDIT_ITEM_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const clearPickupDetails = () => {
    dispatch({ type: CLEAR_PICKUP_DETAILS });
  };

  const setItemDonated = (item) => {
    setTimeout(() => {
      dispatch({ type: SET_ITEM_DONATED });
    }, 0);
  };

  const donateItem = async (_id) => {
    dispatch({ type: DONATE_ITEM_BEGIN });

    const reqBody = {
      pickupLocation: state.pickupLocation,
      pickupTime: state.pickupTime,
    };
    try {
      const item = await authFetch.patch(`/items/donate/${_id}`, reqBody);
      dispatch({ type: DONATE_ITEM_SUCCESS });
      return item;
    } catch (error) {
      dispatch({ type: DONATE_ITEM_ERROR, payload: error.response.data.msg });
      console.log(error);
    }
  };

  const getDonationList = async () => {
    const params = {
      name: state.filterName,
      category: state.filterCategory,
      sort: state.filterSort,
    };
    dispatch({ type: GET_ITEMS_BEGIN });

    try {
      const { data } = await authFetch.get("/items/claim", { params: params });
      const { items, totalItems, numPages } = data;
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: { items, totalItems, numPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const claimItem = async (_id) => {
    const claimItemId = _id;
    dispatch({ type: CLAIM_ITEM_BEGIN });
    try {
      const item = await authFetch.patch(`/items/claim/${claimItemId}`);
      dispatch({ type: CLAIM_ITEM_SUCCESS });
    } catch (error) {
      logoutUser();
    }
  };

  const getClaimedItemList = async () => {
    const params = {
      name: state.filterName,
      category: state.filterCategory,
      sort: state.filterPickup,
    };
    dispatch({ type: GET_ITEMS_BEGIN });

    try {
      const { data } = await authFetch.get("/items/claimed", {
        params: params,
      });

      const { items, totalItems, numPages } = data;

      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: { items, totalItems, numPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        addItem,
        getAllItems,
        setEditItem,
        deleteItem,
        editItem,
        setAddItem,
        applyFilter,
        clearMyItemsFilter,
        clearPickupDetails,
        donateItem,
        getDonationList,
        claimItem,
        displayDonateSuccess,
        getClaimedItemList,
        addAndDonate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
