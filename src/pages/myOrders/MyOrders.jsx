import React, { useEffect, useState } from "react";

export function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const saved  = JSON.parse(localStorage.getItem("products")) || [];
    setOrders(saved.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const getDiscountPercent = (total) => {
    if (total < 500)  return "11%";
    if (total < 1000) return "12%";
    if (total < 2000) return "13%";
    if (total < 3000) return "14%";
    return "15%";
  };

  /* shared EGP amount cell */
  const Egp = ({ value, className = '' }) => (
    <div className={`flex items-baseline gap-0.5 font-bold ${className}`}>
      <span className="text-xs">ج</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div
      className="max-w-4xl mx-auto px-4 pt-[80px] pb-12 min-h-screen"
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      {/* ── Page header ───────────────────────────────────── */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl md:text-4xl font-extrabold inline-block"
          style={{ color: 'var(--teal-800)' }}
        >
          طلباتي 🛍️
        </h1>
        <p className="text-gray-500 mt-1 text-sm">{orders.length} طلب محفوظ</p>
      </div>

      {/* ── Empty state ────────────────────────────────────── */}
      {orders.length === 0 ? (
        <div
          className="text-center py-16 rounded-2xl border border-dashed"
          style={{ borderColor: 'var(--teal-400)', background: 'var(--color-surface-muted)' }}
        >
          <div className="text-6xl mb-4 animate-pulse">📦</div>
          <p className="text-gray-500 text-lg font-semibold">لا يوجد طلبات محفوظة</p>
          <p className="text-gray-400 text-sm mt-1">ابدأ التسوق وستظهر طلباتك هنا</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order, idx) => {
            const { orderDetils } = order;
            const discountPct =  (Number(orderDetils.totalPrice));
            const finalTotal  = Math.ceil(
              Number(orderDetils.priceAfterDiscount) +
              Number(orderDetils.shipping) +
              Number(orderDetils.extraWeight || 0)
            );

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
              >
                {/* Order header */}
                <div
                  className="px-5 py-3 flex justify-between items-center text-white"
                  style={{ background: 'var(--gradient-brand)' }}
                >
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    {orderDetils?.phone && (
                      <>
                        <span className="opacity-80">📞</span>
                        <span>{orderDetils.phone}</span>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-white/80">📅 {order.date}</span>
                </div>

                {/* Items list */}
                <div className="p-4 space-y-2">
                  {order.items?.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-10 items-center bg-gray-50 px-3 py-2 rounded-xl text-sm gap-2"
                    >
                      {/* Total */}
                      <Egp value={item.price * item.quantity} className="col-span-1 text-gray-800 justify-end" />

                      {/* Qty badge */}
                      <div
                        className="col-span-2 text-xs font-bold text-center px-2 py-1 rounded-lg whitespace-nowrap"
                        style={{ background: 'var(--color-surface-muted)', color: 'var(--teal-500)' }}
                      >
                        {item.quantity} ×
                      </div>

                      {/* Unit price */}
                      <Egp value={item.price} className="col-span-1 text-gray-500 justify-end" />

                      {/* Name */}
                      <div className="col-span-6 font-medium text-gray-800 text-right truncate">
                        {`${item.company ?? ''} ${item.name}`.trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price summary */}
                <div className="mx-4 mb-4 bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <Egp value={Math.ceil(Number(orderDetils.totalPrice))} />
                    <span>المجموع</span>
                  </div>

                  <div className="flex justify-between" style={{ color: 'var(--teal-500)' }}>
                    <Egp value={`${orderDetils.discount} -`} />
                    <span>الخصم ({discountPct})</span>
                  </div>

                  <div className="flex justify-between" style={{ color: 'var(--teal-600)' }}>
                    <Egp value={orderDetils.shipping} />
                    <span>🚚 الشحن</span>
                  </div>

                  {Number(orderDetils.extraWeight || 0) > 0 && (
                    <div className="flex justify-between text-orange-500">
                      <Egp value={Math.ceil(Number(orderDetils.extraWeight))} />
                      <span>⚖️ رسوم زيادة الوزن</span>
                    </div>
                  )}

                  {/* Final total */}
                  <div
                    className="flex justify-between items-center text-white px-4 py-3 rounded-xl font-extrabold text-base mt-1"
                    style={{ background: 'var(--gradient-brand)' }}
                  >
                    <Egp value={finalTotal} className="text-white text-lg" />
                    <span>الإجمالي النهائي</span>
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
