import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, markOrderDelivered } from '../../redux/slices/orderSlice.js';
import OrderTable from '../../components/admin/OrderTable.jsx';
import Loader from '../../components/common/Loader.jsx';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleDeliver = async (id) => {
    try {
      await dispatch(markOrderDelivered(id)).unwrap();
      toast.success('Order marked as delivered');
      dispatch(fetchAllOrders());
    } catch {
      toast.error('Failed to update order');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Orders</h1>
      {loading ? <Loader /> : (
        <div className="card overflow-hidden">
          <OrderTable orders={allOrders} onDeliver={handleDeliver} />
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
