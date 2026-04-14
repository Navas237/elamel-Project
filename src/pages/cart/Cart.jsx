import React, { useContext, useEffect, useState, useMemo } from 'react'
import './Cart.css'
import { cartcontext } from '../../context/CartCotext'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import Loadunglotie from '../../assets/lotiefiles/loadingmain.json'
import Errorloite from '../../assets/lotiefiles/Errorlotie.json'
import { IoArrowBackOutline } from 'react-icons/io5'
import { supbasecontext } from '../../context/SupbaseContext'
import { calculateDiscountData, calculateTotalPriceAfterDiscount } from '../../utils/discountUtils'
import { useCheckOut } from '../../hooks/useCheckOut'
import { Button } from '../../components/common'

// Cart sub-components
import CartItem from './components/CartItem'
import CouponSection from './components/CouponSection'
import PriceSummary from './components/PriceSummary'

function Cart() {
    const {
        getProdectData, cartIds, ProductData, setCartIds,
        deletCart, Productloading, setProductData, ProductError
    } = useContext(cartcontext)

    const { offersList } = useContext(supbasecontext)

    // ── Coupon state ──────────────────────────────────────────
    const [couponCode, setCouponCode] = useState('')
    const [appliedCouponCode, setAppliedCouponCode] = useState(
        () => localStorage.getItem('appliedCouponCode') || ''
    )

    // Sync input when appliedCouponCode changes (e.g. on mount)
    useEffect(() => {
        if (appliedCouponCode) setCouponCode(appliedCouponCode)
    }, [appliedCouponCode])

    // Clear coupon when cart empties
    useEffect(() => {
        if (ProductData?.length === 0 && appliedCouponCode) {
            setAppliedCouponCode('')
            setCouponCode('')
            localStorage.removeItem('appliedCouponCode')
        }
    }, [ProductData, appliedCouponCode])

    // ── Data fetch ────────────────────────────────────────────
    useEffect(() => { getProdectData() }, [])

    // ── Coupon handlers ───────────────────────────────────────
    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setAppliedCouponCode('')
            localStorage.removeItem('appliedCouponCode')
            Swal.fire('تنبيه', 'تم إزالة الكوبون', 'info')
            return
        }

        const found = offersList?.find(o =>
            o.status === 'نشط' &&
            o.offer_type === 'coupon' &&
            o.coupon_code?.trim().toUpperCase() === couponCode.trim().toUpperCase()
        )

        if (found) {
            setAppliedCouponCode(found.coupon_code)
            localStorage.setItem('appliedCouponCode', found.coupon_code)
            Swal.fire('نجاح', `تم تطبيق الكوبون (${found.discount_value}%) بنجاح!`, 'success')
        } else {
            Swal.fire('خطأ', 'كود الكوبون غير صالح أو غير متاح لهذه المشتريات', 'error')
        }
    }

    const handleRemoveCoupon = () => {
        setAppliedCouponCode('')
        setCouponCode('')
        localStorage.removeItem('appliedCouponCode')
    }

    // ── Quantity ──────────────────────────────────────────────
    const changeCount = (id, mood) => {
        const item = ProductData.find(p => p.id === id)
        if (!item) return

        if (mood === 'plus') {
            if (item.quantity >= item.stoke) {
                Swal.fire('تنبيه', 'الكمية المطلوبة أكثر من المتوفر في المخزون', 'warning')
                return
            }
            setProductData(prev => prev.map(v => v.id === id ? { ...v, quantity: v.quantity + 1 } : v))
            setCartIds(prev => {
                const updated = { ...prev, [id]: (prev[id] || 0) + 1 }
                localStorage.setItem('cartIdes', JSON.stringify(updated))
                return updated
            })
        } else {
            if (item.quantity === 1) { deletCart(item); return }
            setProductData(prev => prev.map(v => v.id === id && v.quantity > 1 ? { ...v, quantity: v.quantity - 1 } : v))
            setCartIds(prev => {
                const updated = { ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }
                localStorage.setItem('cartIdes', JSON.stringify(updated))
                return updated
            })
        }
    }

    // ── Pricing ───────────────────────────────────────────────
    const totalPrice = ProductData?.reduce((acc, p) => acc + p.price * p.quantity, 0) ?? 0

    const discountData = useMemo(
        () => calculateDiscountData(offersList, ProductData, totalPrice, appliedCouponCode),
        [offersList, ProductData, totalPrice, appliedCouponCode]
    )

    const totalPriceAfterDicount = () =>
        calculateTotalPriceAfterDiscount(totalPrice, discountData.amount, false)

    const { isCheckingOut, handleCheckout } = useCheckOut({
        cartIds, setCartIds, ProductData, setProductData, totalPriceAfterDicount
    })

    // ── Offer badges ──────────────────────────────────────────
    const offerBadges = offersList
        ?.filter(o => o.status === 'نشط' && o.offer_type === 'discount' && !o.hidden)
        .map((offer, i) => ({ ...offer, id: offer.id, discount: `${offer.discount_value}%` })) || []

    const hasCouponOffer = offersList?.some(o => o.status === 'نشط' && o.offer_type === 'coupon')

    // ── Shared coupon/price props ─────────────────────────────
    const couponProps = {
        couponCode, appliedCouponCode,
        onCodeChange: setCouponCode,
        onApply: handleApplyCoupon,
        onRemove: handleRemoveCoupon,
    }

    // ── Render ────────────────────────────────────────────────
    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)' }}>

            {/* Loading */}
            {Productloading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Lottie animationData={Loadunglotie} className="w-[30%] max-w-xs" />
                </div>

            ) : ProductError ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Lottie animationData={Errorloite} className="w-[30%] max-w-xs" />
                </div>

            ) : ProductData.length > 0 ? (
                <div className="flex flex-col items-center !mt-[80px] pb-10 w-full px-4 gap-5">

                    {/* ── Page title ───────────────────────────── */}
                    <h1 className="text-4xl font-bold text-gray-800 text-center">🛒 عربة التسوق</h1>

                    {/* ── Offer badges ─────────────────────────── */}
                    {offerBadges.length > 0 && (
                        <div className="rounded-2xl p-2 border shadow-sm w-fit max-w-full bg-white/85 backdrop-blur-sm" style={{ borderColor: 'var(--color-card-border)' }}>
                            <div className="flex flex-nowrap justify-center gap-2.5 overflow-x-auto px-1">
                                {offerBadges.map(offer => {
                                    const isActive = discountData?.activeOfferIds?.includes(offer.id)
                                    return (
                                        <div
                                            key={offer.id}
                                            className={`card-anmtion flex-1 min-w-0 max-w-[124px] md:max-w-[154px] rounded-2xl p-2.5 md:p-3.5 text-center flex flex-col justify-center h-[84px] md:h-[112px] overflow-hidden transition-all duration-300 border ${isActive ? 'bg-gradient-to-r from-[#F6FBFB] to-[#E7F5F3]' : 'bg-white'}`}
                                            style={{ borderColor: isActive ? 'var(--teal-200)' : 'transparent' }}
                                        >
                                            <div className="text-xs md:text-lg font-extrabold leading-none" style={{ color: 'var(--teal-600)' }}>
                                                {offer.discount}
                                            </div>
                                            <div className="text-[7.5px] md:text-[11px] text-gray-500 font-medium leading-tight mt-1">
                                                {offer.description}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Desktop: table wrapper ────────────────── */}
                    <div className="hidden md:block w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Table header */}
                        <div className="text-white grid grid-cols-8 gap-4 px-6 py-4 font-bold text-lg" style={{ background: 'var(--color-primary-button)' }}>
                            {['حذف', 'الإجمالي', 'الكمية', 'بعد الخصم', 'الخصم', 'قبل الخصم'].map(h => (
                                <div key={h} className="text-center">{h}</div>
                            ))}
                            <div className="col-span-2 text-center">المنتج</div>
                        </div>

                        {/* Items */}
                        {ProductData.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                discountData={discountData}
                                onDelete={() => deletCart(item)}
                                onPlus={() => changeCount(item.id, 'plus')}
                                onMinus={() => changeCount(item.id, 'menus')}
                            />
                        ))}

                        {/* Coupon + price summary */}
                        {hasCouponOffer && <CouponSection {...couponProps} />}
                        <div className="p-6" style={{ background: 'var(--color-surface-muted)' }}>
                            <div className="max-w-md mr-auto">
                                <PriceSummary
                                    totalPrice={totalPrice}
                                    finalPrice={totalPriceAfterDicount()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Mobile: card list ─────────────────────── */}
                    <div className="md:hidden w-full max-w-2xl space-y-2">
                        {ProductData.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                discountData={discountData}
                                onDelete={() => deletCart(item)}
                                onPlus={() => changeCount(item.id, 'plus')}
                                onMinus={() => changeCount(item.id, 'menus')}
                            />
                        ))}

                        {/* Coupon + price summary */}
                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            {hasCouponOffer && <CouponSection {...couponProps} />}
                            <div className="p-3 bg-white">
                                <PriceSummary
                                    totalPrice={totalPrice}
                                    finalPrice={totalPriceAfterDicount()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Checkout button ───────────────────────── */}
                    <div className="w-full max-w-md pt-1">
                        <Button
                            variant="success"
                            size="lg"
                            fullWidth
                            loading={isCheckingOut}
                            loadingText="جاري التحقق..."
                            disabled={Productloading}
                            onClick={handleCheckout}
                            leadingIcon={<IoArrowBackOutline />}
                        >
                            ادخل بيانات التوصيل
                        </Button>
                    </div>
                </div>

            ) : (
                /* ── Empty cart ──────────────────────────────── */
                <div className="flex justify-center items-center mt-[120px] px-4">
                    <div className="flex flex-col items-center gap-5 p-10 bg-white rounded-3xl shadow-xl max-w-2xl w-full text-center">
                        <div className="animate-bounce">
                            <img src="https://i.imgur.com/dCdflKN.png" width="170" height="170" alt="عربة فارغة" className="img-fluid" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">العربة فارغة</h3>
                        <p className="text-xl text-gray-600">العربية فاضية 😢… يلا نضيف كتب دراسية ونظبط مذاكرتك! 📚✏️</p>
                        <Link
                            to="/"
                            className="text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            style={{ background: 'var(--color-primary-button)' }}
                        >
                            🛍️ ابدأ التسوق الآن
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
