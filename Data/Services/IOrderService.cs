using System.Collections.Generic;

namespace RTSystem.Data
{
    public interface IOrderService
    {
        IEnumerable<Orders> GetAllOrders();
        Orders GetOrdersById(int orderId);
        IEnumerable<Orders> GetOrdersByBuyerBidId(int buyerBidId);
        IEnumerable<Orders> GetOrdersBySellerBidId(int sellerBidId);
        void CreateOrder(Orders order);
        void UpdateOrder(int orderId, Orders order);
        void DeleteOrder(int orderId);
    }
}