import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto mt-12 md:mt-0 text-gray-200 pt-12 px-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error?.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <td className="py-2 px-4 text-left">IMAGE</td>
                <td className="py-2 px-4 text-left">ID</td>
                <td className="py-2 px-4 text-left">DATE</td>
                <td className="py-2 px-4 text-left">TOTAL</td>
                <td className="py-2 px-4 text-left">PAID</td>
                <td className="py-2 px-4 text-left">DELIVERED</td>
                <td className="py-2 px-4 text-left"></td>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-[6rem] mb-5 max-w-full"
                    />
                  </td>

                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 px-4">$ {order.totalPrice}</td>

                  <td className="py-2 px-4">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-400 text-black py-2 px-3 rounded">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
