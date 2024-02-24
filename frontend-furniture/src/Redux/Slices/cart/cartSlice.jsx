import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// localStorage'dan sepet verisini almak için bir yardımcı fonksiyon
const getInitialCart = () => {
  const storedCart = localStorage.getItem("furnitureItems");
  // Eğer depolanan veri yoksa veya boşsa, varsayılan bir sepet oluştur
  if (!storedCart || storedCart === "[]") {
    const defaultCart = [];
    // Varsayılan sepeti localStorage'a kaydet
    localStorage.setItem("furnitureItems", JSON.stringify(defaultCart));
    return defaultCart;
  }
  // Depolanan veri varsa ve boş değilse, bunu parse edip döndür
  return JSON.parse(storedCart);
};

// Başlangıç durumu
const INITIAL_STATE = {
  loading: false,
  error: null,
  cart: getInitialCart(), // Sepet verisi
};

// Sepete ürün eklemek için asenkron işlem oluşturma
export const addToCart = createAsyncThunk(
  "cart/add-cart",
  async (cartItem, { rejectWithValue, getState, dispatch }) => {
    try {
      // Sepete öğe ekleme
      const updatedCart = [...getState().cart.cart, cartItem];

      // localStorage'a sepet verisini kaydetme
      localStorage.setItem("furnitureItems", JSON.stringify(updatedCart));

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Sepetten ürün çıkarmak için asenkron işlem oluşturma
export const removeToCart = createAsyncThunk(
  "cart/remove-cart",
  async (itemId, { rejectWithValue }) => {
    try {
      // Burada aslında bir backend isteği yapılabilir
      // Ancak, burada sadece belirli bir öğeyi sepetten çıkarmayı simüle ediyoruz
      const filteredCartItems = INITIAL_STATE.cart.filter((cartItem) => {
        return cartItem._id !== itemId;
      });
      return filteredCartItems;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Redux Slice oluşturma
const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    // addToCart ile ilgili durumları işleme ekleme
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // removeToCart ile ilgili durumları işleme ekleme
    builder.addCase(removeToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeToCart.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

// Reducer'ı oluşturma
const cartReducer = cartSlice.reducer;

export default cartReducer;
