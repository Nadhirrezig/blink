
import Pagination from '@/components/ui/pagination'
import { placeholderOrders } from '@/lib/placeholder-data'

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-white p-4 shadow">
          <table className="min-w-full text-sm text-gray-900">
            <thead className="text-left font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Table</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {placeholderOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-none">
                  <td className="px-4 py-4 font-medium">Table {order.tableNumber}</td>
                  <td className="px-4 py-4 text-gray-600">{order.orderCode}</td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i} className="text-gray-700">
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

          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(placeholderOrders.length / 6)} />
          </div>
        </div>
      </div>
    </div>
  )
}
