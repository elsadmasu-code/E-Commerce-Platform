import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrderById, getMyOrders, getAllOrders, payOrder, deliverOrder } from '../../services/api.js';

export const placeOrder = createAsyncThunk('orders/place', async (orderData, { rejectWithValue }) => {
  try {
    const { data } = await createOrder(orderData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await getOrderById(id);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMine', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getMyOrders();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAllOrders();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const markOrderPaid = createAsyncThunk('orders/pay', async ({ id, paymentResult }, { rejectWithValue }) => {
  try {
    const { data } = await payOrder(id, paymentResult);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const markOrderDelivered = createAsyncThunk('orders/deliver', async (id, { rejectWithValue }) => {
  try {
    const { data } = await deliverOrder(id);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { order: null, orders: [], allOrders: [], loading: false, error: null, success: false },
  reducers: {
    resetOrder: (state) => { state.order = null; state.success = false; state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.loading = false; state.success = true; state.order = action.payload; })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchOrderById.pending, (state) => { state.loading = true; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.loading = false; state.order = action.payload; })
      .addCase(fetchOrderById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.orders = action.payload; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.allOrders = action.payload; })
      .addCase(markOrderPaid.fulfilled, (state, action) => { state.order = action.payload; })
      .addCase(markOrderDelivered.fulfilled, (state, action) => { state.order = action.payload; });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
