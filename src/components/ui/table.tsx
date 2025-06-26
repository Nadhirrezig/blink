import Pagination from '@/components/ui/pagination';
import { placeholderOrders } from '@/lib/placeholder-data';

export default function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const ordersPerPage = 6;
  const totalPages = Math.ceil(placeholderOrders.length / ordersPerPage);
  const paginatedOrders = placeholderOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="md:hidden space-y-4">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="rounded-md border p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Table {order.tableNumber}</span>
                  <span className="text-xs text-gray-500">{order.orderCode}</span>
                </div>
                <ul className="text-sm text-gray-700 divide-y divide-gray-200 border rounded-md mb-2 overflow-hidden">
                  {order.items.map((item, i) => (
                    <li key={i} className="p-2 first:pt-0 last:pb-0">
                      <div className="font-bold">
                        x{item.quantity} {item.name}
                      </div>
                      <span className="block text-xs text-gray-500">{item.details}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Subtotal: {order.subtotal.toFixed(2)} DT</p>
                  <p>Discount: {order.discount.toFixed(2)} DT</p>
                  <p className="font-semibold">Total: {order.total.toFixed(2)} DT</p>
                  <p>
                    Status:{' '}
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-sm text-gray-900 md:table">
            <thead className="text-left font-semibold border-b border-gray-200">
              <tr>
                <th className="px-8 py-3">Table</th>
                <th className="px-8 py-3">Order ID</th>
                <th className="px-8 py-3">Items</th>
                <th className="px-8 py-3">Subtotal</th>
                <th className="px-8 py-3">Discount</th>
                <th className="px-8 py-3">Total</th>
                <th className="px-8 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-none hover:bg-gray-50 ">
                  <td className="px-4 py-4 font-medium">Table {order.tableNumber}</td>
                  <td className="px-4 py-4 text-gray-600">{order.orderCode}</td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="font-medium text-gray-800">
                          x{item.quantity} {item.name}
                          <span className="block text-xs text-gray-400">
                            {item.details}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4">{order.subtotal.toFixed(2)} DT</td>
                  <td className="px-4 py-4">{order.discount.toFixed(2)} DT</td>
                  <td className="px-4 py-4 font-semibold">{order.total.toFixed(2)} DT</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
