import React, { useEffect, useState } from "react";

export function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const savedOrders = JSON.parse(localStorage.getItem("products")) || [];


    const sortedOrders = savedOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );


    setOrders(sortedOrders);
  }, []);

  const getDiscountPercentage = (totalPrice) => {
    if (totalPrice < 500) return "11%";
    else if (totalPrice < 1000) return "12%";
    else if (totalPrice < 2000) return "13%";
    else if (totalPrice < 3000) return "14%";
    else return "15%";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[70px] mb-8">
      {/* Header مضغوط */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          طلباتي 🛍️
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-lg">📦 لا يوجد طلبات محفوظة</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order, idx) => {
            const { orderDetils } = order;
            const discountPercent = getDiscountPercentage(Number(orderDetils.totalPrice));

            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
              >

                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {order.orderDetils?.phone && (
                      <span className="text-sm font-semibold flex items-center gap-1">
                        <span className="opacity-80">📞</span> {order.orderDetils.phone}
                      </span>
                    )}
                  </div>
                  <span className="text-sm opacity-90">📅 {order.date}</span>
                </div>

                <div className="p-4">

                  <div className="space-y-2 mb-4">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-10 items-center   bg-gray-50 px-4 py-2 rounded-lg text-sm gap-3"
                      >




                        {/* الإجمالي */}
                        <div className="flex items-center gap-1 col-span-1 text-gray-800 font-bold justify-end">
                          <span className="text-xs">ج</span>
                          <span>{item.price * item.quantity}</span>
                        </div>

                        {/* الكمية */}
                        <div className="bg-purple-100 col-span-2 me-3 text-purple-700 px-2 py-1 rounded text-xs font-medium text-center whitespace-nowrap">
                          {item.quantity} ×
                        </div>


                        {/* السعر */}
                        <div className="flex items-center gap-1 col-span-1  text-gray-600 justify-end">
                          <span className="text-xs">ج</span>
                          <span className="font-semibold">{item.price}</span>
                        </div>



                        {/* الاسم */}
                        <div className="font-medium grid grid-cols-5  justify-self-end col-span-6 text-gray-800 truncate">
                          {/* الأيقونة */}
                          {/* <span className="text-[14px] col-span-1 pe-1">📚</span> */}
                          <span className="col-span-5">
                            {`${item.company? item.company : ""} ${item.name}`}

                          </span>
                        </div>
                      </div>
                    ))}
                  </div>



                  <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">

                      <div className="font-semibold flex gap-1">
                        <span> ج
                        </span>{Math.ceil(Number(orderDetils.totalPrice))} </div>
                      <span>المجموع</span>
                    </div>
                    <div className="flex justify-between text-green-600">

                      <div className="font-semibold flex gap-1">
                        <span>ج</span>
                        - {orderDetils.discount} </div>
                      <div>
                        الخصم ({discountPercent})

                      </div>
                    </div>

                    <div className="flex justify-between text-blue-600">
                      <div className="font-semibold flex gap-1">
                        <span>ج </span>{orderDetils.shipping} </div>
                      <span>🚚 الشحن</span>
                    </div>
                    {orderDetils.extraWeight && Number(orderDetils.extraWeight) > 0 && (
                      <div className="flex justify-between text-orange-600">
                        <div className="font-semibold flex gap-1"> <span>ج</span>{Math.ceil(Number(orderDetils.extraWeight))} </div>
                        <span>⚖️ رسوم زيادة الوزن</span>
                      </div>
                    )}
                    <div className="flex justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg font-bold">
                      <div className="text-lg flex gap-1">
                        <span>ج</span>
                        {Math.ceil(Number(orderDetils.priceAfterDiscount) + Number(orderDetils.shipping) + Number(orderDetils.extraWeight || 0))}
                      </div>
                      <span>الإجمالي</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;