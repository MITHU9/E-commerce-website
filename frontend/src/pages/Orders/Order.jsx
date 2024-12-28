import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [{ isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       await payOrder({ orderId, details });
  //       refetch();
  //       toast.success("Order is paid");
  //     } catch (error) {
  //       toast.error(error?.data || error.message);
  //     }
  //   });
  // }

  // function createOrder(data, actions) {
  //   return actions.order
  //     .create({
  //       purchase_units: [{ amount: { value: order.totalPrice } }],
  //     })
  //     .then((orderID) => {
  //       return orderID;
  //     });
  // }

  // function onError(err) {
  //   toast.error(err.message);
  // }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container mt-8 md:mt-0 mx-auto text-white pt-12 px-4 py-2">
      <div className="flex flex-col md:ml-20 xl:ml-0 xl:flex-row lg:pl-12 xl:pl-0">
        {/* Order Items Section */}
        <div className="md:w-full xl:w-2/3 pr-4">
          <div className="border border-gray-300 mt-5 pb-4 mb-5">
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="border-b-2">
                    <tr>
                      <th className="p-2 text-left">Image</th>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2 text-center">Unit Price</th>
                      <th className="p-2 text-center">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-center">{item.price}</td>
                        <td className="p-2 text-center">
                          $ {(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Details & Order Summary Section */}
        <div className="md:w-full xl:w-2/3 mt-4 md:mt-0 ">
          <div className=" pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Shipping</h2>
            <p className="mb-4">
              <strong className="text-pink-500">Order:</strong> {order._id}
            </p>

            <p className="mb-4">
              <strong className="text-pink-500">Name:</strong>{" "}
              {order.user.name ? order.user.name : userInfo.name}
            </p>

            <p className="mb-4">
              <strong className="text-pink-500">Email:</strong>{" "}
              {order.user.email}
            </p>

            <p className="mb-4">
              <strong className="text-pink-500">Address:</strong>{" "}
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>

            <p className="mb-4">
              <strong className="text-pink-500">Method:</strong>{" "}
              {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <Message variant="success">
                Paid on
                <span className="text-black ml-2">
                  {new Date(order.updatedAt).toLocaleDateString()}{" "}
                  {new Date(order.updatedAt).toLocaleTimeString()}
                </span>
              </Message>
            ) : (
              <Message variant="danger">Not paid</Message>
            )}
          </div>

          <h2 className="text-xl font-bold mb-2 mt-8">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>$ {order.itemsPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$ {order.shippingPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>$ {order.taxPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>$ {order.totalPrice}</span>
          </div>

          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}
              {loadingPay ? (
                <Loader />
              ) : (
                <div>
                  {/* PayPalButtons Component (if needed) */}
                  {/* <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} /> */}
                </div>
              )}
            </div>
          )}

          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <div>
                <button
                  type="button"
                  className="bg-pink-500 text-white w-full py-2 mt-4"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Order;
