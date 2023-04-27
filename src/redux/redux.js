import { configureStore, createSlice } from "@reduxjs/toolkit";

//connected user
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
//connected user
const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState: {googleLogin: false},
  reducers: {
    setGoogleLogin: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGoogleLogin } = googleLoginSlice.actions;

//owner slice
const ownerSlice = createSlice({
  name: "owner",
  initialState: [],
  reducers: {
    setOwner: (state, action) => {
      return [...action.payload];
    },
    addOwner: (state, action) => {
      state.push(action.payload);
    },
    updateOneOwnerById: (state, action) => {
      return state.map(owner => {
        if (owner._id === action.payload._id) {
          return { ...owner, fullName: action.payload.fullName, phone1: action.payload.phone1, phone2: action.payload.phone2 };
        } else {
          return owner;
        }
      });
    }
  },
});
export const { setOwner, addOwner, updateOneOwnerById } = ownerSlice.actions;
//paginnations
const paginationSlice = createSlice({
  name: "pagination",
  initialState: [
    { currentPage: 1, totalPage: 0 },
    { itemsPerPage: 2, startIndex: 0, endIndex: 0 },
    { activeLink: "/" },
  ],
  reducers: {
    updateCurrentPage: (state, action) => {
      state[0].currentPage = action.payload;
    },
    updateActiveLink: (state, action) => {
      state[2].activeLink = action.payload;
    },
    setTotalPage: (state, action) => {
      state[0].totalPage = Math.ceil(action.payload / state[1].itemsPerPage);
      state[1].startIndex = (state[0].currentPage - 1) * state[1].itemsPerPage;
      state[1].endIndex = state[1].startIndex + state[1].itemsPerPage;
    },
  },
});
export const {
  updateCurrentPage,
  setTotalPage,
  setResetAgentInput,
  updateActiveLink,
} = paginationSlice.actions;

//Top50Properties
const topPropertiesSlice = createSlice({
  name: "topProperties",
  initialState: null,
  reducers: {
    setTopProperties: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTopProperties } = topPropertiesSlice.actions;

//properties
const propertiesSlice = createSlice({
  name: "properties",
  initialState: null,
  reducers: {
    setProperties: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProperties } = propertiesSlice.actions;

//liked properties
const likedPropertiesSlice = createSlice({
  name: "likedProperties",
  initialState: null,
  reducers: {
    setLikedPropreties: (state, action) => {
      return [...action.payload];
    },
    addLike: (state, action) => {
      state.push(action.payload);
    },
    deleteLike: (state, action) => {
      //action.payload is the id of the like
      return state.filter((like) => like._id !== action.payload)
    },
  },
});

export const { setLikedPropreties, addLike, deleteLike } = likedPropertiesSlice.actions;

//liked properties
const bookingSlice = createSlice({
  name: "booking",
  initialState: null,
  reducers: {
    setBooking: (state, action) => {
      return [...action.payload];
    },
    addBooking: (state, action) => {
      state.push(action.payload);
    },
    deleteBooking: (state, action) => {
      return state.filter((booking) => booking._id !== action.payload)
    },
  },
});

export const { setBooking, addBooking, deleteBooking } = bookingSlice.actions;

//owner slice
const locationSlice = createSlice({
  name: "location",
  initialState: [],
  reducers: {
    setLocation: (state, action) => {
      return [...action.payload];
    },
    addLocation: (state, action) => {
      state.push(action.payload);
    },
    updateOneLocationById: (state, action) => {
      return state.map(location => {
        if (location._id === action.payload._id) {
          return { ...location, address: action.payload.address, locationLink: action.payload.locationLink };
        } else {
          return location;
        }
      });
    }
  },
});
export const { setLocation, addLocation, updateOneLocationById } = locationSlice.actions;
export const store = configureStore({
  reducer: {
    owner: ownerSlice.reducer,
    user: userSlice.reducer,
    pagination: paginationSlice.reducer,
    topProperties: topPropertiesSlice.reducer,
    properties: propertiesSlice.reducer,
    booking: bookingSlice.reducer,
    location: locationSlice.reducer,
    likedProperties: likedPropertiesSlice.reducer,
    googleLogin: googleLoginSlice.reducer,
  },
});
