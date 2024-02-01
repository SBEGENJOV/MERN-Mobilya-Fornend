const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  isDelete:false,
  isUpdated:false,
  isRegistered: false,
  isLogin: false,
  emailMessage: undefined,
  profile: {},
  isLiked: [],
  isViewed: [],
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
