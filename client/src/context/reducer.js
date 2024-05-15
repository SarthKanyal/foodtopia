import {
  DISPLAY_ALERT,
  CLEAR_AlERT,
  SUCCESS,
  ERROR,
  SETUP_USER_BEGIN,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  ADD_ITEM_BEGIN,
  ADD_ITEM_SUCCESS,
  GET_ITEMS_BEGIN,
  GET_ITEMS_SUCCESS,
  EDIT_ITEM,
  EDIT_ITEM_BEGIN,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_ERROR,
  SET_ADD_ITEM,
  DELETE_ITEM_BEGIN,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  APPLY_FILTER,
  CLEAR_MYITEMS_FILTER,
  DONATE_ITEM_SUCCESS,
  DONATE_ITEM_BEGIN,
  DONATE_ITEM_ERROR,
  CLEAR_PICKUP_DETAILS,
  CLAIM_ITEM_BEGIN,
  CLAIM_ITEM_SUCCESS,
  DISPLAY_DONATE_SUCCESS,
  SET_ITEM_DONATED,
} from "./actions";

import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  } else if (action.type === CLEAR_AlERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  } else if (action.type === DISPLAY_DONATE_SUCCESS) {
    console.log("display success");
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "Item donated successfully",
    };
  } else if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
      isLoading: false,
    };
  } else if (action.type === ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
      isLoading: false,
    };
  } else if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  } else if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null };
  } else if (action.type === HANDLE_CHANGE) {
    // if (
    //   action.payload.name === "pickupTime" ||
    //   action.payload.name === "pickupLocation"
    // ) {
    //   // if (!state.pickupLocation && !state.pickupTime) {
    //   //   return {
    //   //     ...state,
    //   //     isDonating: false,
    //   //     [action.payload.name]: action.payload.value,
    //   //   };
    //   // }

    //   return {
    //     ...state,
    //     isDonating: true,
    //     [action.payload.name]: action.payload.value,
    //   };
    // } else {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
    //}
  } else if (action.type === CLEAR_VALUES) {
    const initialState = {
      editItemId: "",
      category: "",
      name: "",
      quantity: "",
      unit: "",
      expiresOn: "",
      pickupTime: "",
      pickupLocation: "",
      isDonating: false,
    };
    return { ...state, ...initialState };
  } else if (action.type === ADD_ITEM_BEGIN) {
    return { ...state, isLoading: true };
  } else if (action.type === ADD_ITEM_SUCCESS) {
    return {
      ...state,

      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Item added successfully",
    };
  } else if (action.type === "ADD_ITEM_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  } else if (action.type === GET_ITEMS_BEGIN) {
    return { ...state, isLoading: true };
  } else if (action.type === GET_ITEMS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      items: action.payload.items,
      totalItems: action.payload.totalItems,
      numPages: action.payload.numPages,
    };
  } else if (action.type === EDIT_ITEM) {
    const itemToEdit = state.items.find(
      (item) => item._id === action.payload.itemId
    );

    const { _id, category, name, quantity, unit, expiresOn } = itemToEdit;

    return {
      ...state,
      isEditing: true,
      editItemId: _id,
      category,
      name,
      quantity,
      unit,
      expiresOn,
    };
  } else if (action.type === EDIT_ITEM_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  } else if (action.type === EDIT_ITEM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Item updated successfully",
    };
  } else if (action.type === EDIT_ITEM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload,
    };
  } else if (action.type === SET_ADD_ITEM) {
    return { ...state, isEditing: false };
  } else if (action.type === DELETE_ITEM_BEGIN) {
    return { ...state, isLoading: true };
  } else if (action.type === APPLY_FILTER) {
    return { ...state, isLoading: true };
  } else if (action.type === CLEAR_MYITEMS_FILTER) {
    return {
      ...state,
      isLoading: false,
      filterName: "",
      filterCategory: "",
      filterSort: "expiring soon-later",
    };
  } else if (action.type === CLEAR_PICKUP_DETAILS) {
    return { ...state, pickupTime: "", pickupLocation: "" };
  } else if (action.type === DONATE_ITEM_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  } else if (action.type === DONATE_ITEM_SUCCESS) {
    return {
      ...state,
      isDonating: false,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Item donated",
      itemDonated: !state.itemDonated,
    };
  } else if (action.type === SET_ITEM_DONATED) {
    return {
      ...state,
      itemDonated: !state.itemDonated,
    };
  } else if (action.type === DONATE_ITEM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  } else if (action.type === CLAIM_ITEM_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  } else if (action.type === CLAIM_ITEM_SUCCESS) {
    return { ...state, isLoading: false, itemClaimed: !state.itemClaimed };
  } else {
    throw new Error(`No such action ${action.type}`);
  }
};

export default reducer;
