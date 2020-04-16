using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace RTSystem.Data
{
    public class OrderService : IOrderService
    {
        readonly RTSystemsContext _RTSystemContext;

        public OrderService(RTSystemsContext systemsContext)
        {
            _RTSystemContext = systemsContext;
        }

        public IEnumerable<Orders> GetAllOrders()
        {
            return _RTSystemContext.Orders
                .Include(o => o.BuyerBid)
                .Include(o => o.SellerBid)
                .ToList();
        }
        public Orders GetOrdersById(int orderId)
        {
            var orderExist = _RTSystemContext.Orders.FirstOrDefault(o => o.OrderId == orderId);
            
            if (orderExist == null)
            {
                throw new Exception("Order Not Found");
            }

            return orderExist;
        }
        public IEnumerable<Orders> GetOrdersByBuyerBidId(int buyerBidId)
        {
            var orderExist = _RTSystemContext.Orders.FirstOrDefault(o => o.BuyerBidId == buyerBidId);

            if (orderExist == null)
            {
                throw new Exception("Order Not Found");
            }

            return _RTSystemContext.Orders.Where(o => o.BuyerBidId == buyerBidId).ToList();
        }
        public IEnumerable<Orders> GetOrdersBySellerBidId(int sellerBidId)
        {
            var orderExist = _RTSystemContext.Orders.FirstOrDefault(o => o.SellerBidId == sellerBidId);

            if (orderExist == null)
            {
                throw new Exception("Order Not Found");
            }

            return _RTSystemContext.Orders.Where(o => o.SellerBidId == sellerBidId).ToList();
        }
        public void CreateOrder(Orders order)
        {
            if (order == null)
            {
                throw new Exception("Incomplete Fields");
            }

            _RTSystemContext.Orders.Add(order);
            _RTSystemContext.SaveChanges();
        }
        public void UpdateOrder(int orderId, Orders order)
        {
            var orderExist = _RTSystemContext.Orders.FirstOrDefault(o => o.OrderId == orderId);

            if (orderExist == null)
            {
                throw new Exception("Failed to Update");
            }

            if (order.BuyerBidId != null)
            {
                orderExist.BuyerBidId = order.BuyerBidId;
            }
            if (order.SellerBidId != null)
            {
                orderExist.SellerBidId = order.SellerBidId;
            }

            _RTSystemContext.SaveChanges();
        }
        public void DeleteOrder(int orderId)
        {
            var orderExist = _RTSystemContext.Orders.FirstOrDefault(o => o.OrderId == orderId);

            if (orderExist == null)
            {
                throw new Exception("Order Not Found");
            }

            _RTSystemContext.Orders.Remove(orderExist);
            _RTSystemContext.SaveChanges();
        }
        
    }
}