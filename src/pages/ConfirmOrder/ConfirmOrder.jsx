import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import './ConfirmOrder.css'
import { useForm } from 'react-hook-form'
import { cartcontext } from '../../context/CartCotext'
import { zodResolver } from '@hookform/resolvers/zod'
import { escema, getDynamicSchema } from '../../schemas/ConfirmOrderValidation'
import { IconLoading, IconArrowLeft, IconCart } from '../../lib/icons'
import FormHelperText from '@mui/material/FormHelperText'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { supabase } from '../../services/SupabaseClient'
import { supbasecontext } from '../../context/SupbaseContext'
import InvoiceModal from '../../components/InvoiceModal'
import whatsLo from "../../images/image.png"
import { contrallSpipping } from './service/shipping'
import { calculateDiscountData, calculateTotalPriceAfterDiscount } from '../../utils/discountUtils'

import { useMinimum } from '../../hooks/useMinmum'

function ConfirmOrder() {
  const [selectedGovernorate, setSelectedGovernorate] = useState('')
  const [selectedCenter, setSelectedCenter] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [msarefElchange, setMsarefElchange] = useState('')
  const [increasWight, setIncreasWight] = useState('')

  const navigate = useNavigate()

  const { confirmOrder, ProductData, cartIds, setCartIds, getProdectData, trackPurchase } = useContext(cartcontext)
  const { updateProduct, offersList, shippingList } = useContext(supbasecontext)
  const [longOfCharge, setlongOfCharge] = useState('')
  const [confirmOrderLoading, setconfirmOrderLoading] = useState(false)
  const purchaseTrackedRef = React.useRef(false)
  const isSubmittingRef = useRef(false)
  const invoiceRef = useRef(null)
  const [orderForInvoice, setOrderForInvoice] = useState(null)


  const generateOrderNumber = () => {
    return Math.round(1000000 + Math.round() * 9000000); // 
  }

  // Upload invoice image to Supabase Storage
  const uploadInvoiceToStorage = async (orderNum, base64Image) => {
    try {
      // Convert base64 to blob
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      const fileName = `${orderNum}.png`;

      const { data, error } = await supabase.storage
        .from('invoices')
        .upload(fileName, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) {
        console.error('❌ Invoice upload failed:', error);
        return null;
      }

      // console.log('✅ Invoice uploaded successfully:', data);
      return data;
    } catch (err) {
      console.error('❌ Invoice upload error:', err);
      return null;
    }
  }

  // Generate invoice image directly (called from submitOrder)
  const generateInvoiceImage = async (orderData) => {
    // Set order for invoice modal to render
    setOrderForInvoice(orderData);

    // Wait for React to render the invoice modal
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate and upload invoice
    if (invoiceRef.current && orderData.order_num) {
      try {
        const imageData = await invoiceRef.current.generateInvoiceImage();
        if (imageData) {
          await uploadInvoiceToStorage(orderData.order_num, imageData);
          console.log('✅ Invoice generated and uploaded before order completion');
        }
      } catch (err) {
        console.error('❌ Invoice generation error:', err);
      }
    }
  }

  useEffect(() => {
    if (ProductData.length === 0 && Object.keys(cartIds).length > 0) {
      getProdectData();
    }
  }, []);








  useEffect(() => {
    if (shippingList && shippingList.length > 0 && selectedGovernorate) {
      const result = contrallSpipping(shippingList, selectedGovernorate, selectedCenter, selectedArea)
      setMsarefElchange(result?.cost ?? 0)
      setlongOfCharge(result?.duration || '')
    } else {
      setMsarefElchange('')
      setlongOfCharge('')
    }
  }, [shippingList, selectedGovernorate, selectedCenter, selectedArea])





  const totalPrice = ProductData?.reduce((a, b) => {
    const total = b.price * b.quantity
    return total + a
  }, 0)

  const appliedCouponCode = useMemo(() => localStorage.getItem('appliedCouponCode') || '', []);
  const discountData = useMemo(() => calculateDiscountData(offersList, ProductData, totalPrice, appliedCouponCode), [offersList, ProductData, totalPrice, appliedCouponCode]);

  const totalPriceAfterDicount = () => {
    return calculateTotalPriceAfterDiscount(totalPrice, discountData.amount, true)
  }



  const increasWightt = (val) => {
    const check = val !== undefined ? val : selectedCenter;
    if (check !== "الزقازيق") {
      if (totalPrice) {
        if (totalPrice < 1800) {
          setIncreasWight(0)
        } else if (totalPrice < 2700) {
          setIncreasWight(20)
        } else if (totalPrice < 3000) {
          setIncreasWight(25)
        } else if (totalPrice < 4000) {
          setIncreasWight(35)
        } else if (totalPrice < 5000) {
          setIncreasWight(45)
        } else if (totalPrice > 5000) {
          setIncreasWight(totalPrice * 2.3 / 100)
        }
      }
    } else {
      setIncreasWight(0)
    }
  }

  useEffect(() => {
    window.scroll({ top: 0 })
  }, [])

  // First, all derived states from shippingList need to be initialized before the form
  const normalizedShippingList = useMemo(() => {
    if (!Array.isArray(shippingList)) {
      return [];
    }

    return shippingList.map((item) => ({
      ...item,
      centers: Array.isArray(item?.centers) ? item.centers : []
    }));
  }, [shippingList]);

  const selectedGovernorateData = useMemo(
    () => normalizedShippingList.find((item) => item.governorate === selectedGovernorate) || null,
    [normalizedShippingList, selectedGovernorate]
  );

  const availableCenters = useMemo(
    () => selectedGovernorateData?.centers || [],
    [selectedGovernorateData]
  );

  const selectedCenterData = useMemo(
    () => availableCenters.find((item) => item?.name === selectedCenter) || null,
    [availableCenters, selectedCenter]
  );

  const availableAreas = useMemo(
    () => Array.isArray(selectedCenterData?.areas) ? selectedCenterData.areas : [],
    [selectedCenterData]
  );

  // Prepare options for react-select before useForm
  const governorateOptions = useMemo(() =>
    normalizedShippingList
      .filter(item => item?.governorate)
      .map(item => ({ value: item.governorate, label: item.governorate })),
    [normalizedShippingList]);

  const centerOptions = useMemo(() => {
    return availableCenters
      .filter(item => item?.name)
      .map(item => ({ value: item.name, label: item.name }));
  }, [availableCenters]);

  const areaOptions = useMemo(() =>
    availableAreas
      .filter(item => item?.name)
      .map(item => ({ value: item.name, label: item.name })),
    [availableAreas]);

  // Now initialize useForm
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isValid }
  } = useForm({
    resolver: zodResolver(getDynamicSchema(areaOptions?.length > 0)),
    mode: "all",
    defaultValues: {
      name: '',
      phone: '',
      whats: '',
      gover: '',
      center: '',
      mantaq: '',
      address: ''
    }
  });
  // Auto-scroll to first error
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const element = document.getElementsByName(firstError)[0] ||
        document.querySelector(`[name="${firstError}"]`) ||
        document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);


  useEffect(() => {
    increasWightt()
  }, [totalPrice, selectedCenter])


  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '12px',
      padding: '5px',
      fontSize: '18px',
      backgroundColor: '#f8f9fa',
      border: state.isFocused ? '2px solid var(--teal-400)' : '1px solid #e1e4e8',
      boxShadow: state.isFocused ? '0 4px 12px rgba(78,196,189,0.18)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--teal-400)' : 'var(--teal-200)',
        backgroundColor: '#fff',
      },
      transition: 'all 0.3s ease',
      textAlign: 'right',
      direction: 'rtl'
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: 'right',
      fontSize: '16px',
      color: '#64748b'
    }),
    singleValue: (base) => ({
      ...base,
      textAlign: 'right'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      zIndex: 100
    }),
    option: (base, state) => ({
      ...base,
      textAlign: 'right',
      fontSize: '16px',
      backgroundColor: state.isSelected ? 'var(--teal-400)' : state.isFocused ? 'var(--teal-50)' : '#fff',
      color: state.isSelected ? '#fff' : '#334155',
      '&:active': {
        backgroundColor: 'var(--teal-500)',
      }
    }),
    container: (base) => ({
      ...base,
      marginBottom: '24px'
    })
  };

  function getShippingDetails() {
    return {
      cost: Number(msarefElchange) || 0,
      duration: longOfCharge || ''
    };
  }

  const getformData = async (data) => {
    const shippingDetails = getShippingDetails();
    const shippingCost = Number(shippingDetails.cost) || 0;
    const extraWeight = Math.ceil(Number(increasWight));
    const deliveryDuration = shippingDetails.duration.trim();

    const orderData = {
      ...data,
      totalPrice: totalPrice,
      discount: Number(totalPrice) - Number(totalPriceAfterDicount()),
      priceAfterDiscount: Number(totalPriceAfterDicount()),
      shipping: shippingCost,
      extraWeight,
      deliveryDuration,
      net: totalPriceAfterDicount() + shippingCost + Number(increasWight),
      Deliver: Number(increasWight) === 0
        ? `${shippingCost}`
        : `${shippingCost} + ${extraWeight} = ${shippingCost + extraWeight}`
    };

    const { name, phone, address, gover, center, whats, mantaq, Deliver, net, totalPrice: finalTotalPrice, discount: finalDiscount, priceAfterDiscount: finalPriceAfterDiscount } = orderData;
    const locationSuffix = mantaq ? ` - ${mantaq}` : '';
    const fullAddress = `${gover}(${center}${locationSuffix}) - ${address}`;



   
    const submitOrder = async () => {
      // Prevent duplicate submissions using ref (immediate check)
      if (isSubmittingRef.current || confirmOrderLoading) return;
      isSubmittingRef.current = true;

      try {
        setconfirmOrderLoading(true);
        const orderNum = generateOrderNumber();

        const { data: insertedData, error } = await supabase
          .from('orders')
          .insert([{
            name,
            phone,
            whats,
            Deliver,
            address: fullAddress,
            cart_items: ProductData,
            created_at: new Date().toISOString(),
            total_price: finalTotalPrice,
            discount: finalDiscount,
            price_dis: finalPriceAfterDiscount,
            totalAfter_deliver: net,
            status: 'new',
            order_num: orderNum
          }])
          .select();

        if (error) {
          console.error("❌ Order insert failed:", error);
          setconfirmOrderLoading(false);
          return;
        }

        // Generate and upload invoice BEFORE completing order flow
        if (insertedData?.[0]) {
          await generateInvoiceImage(insertedData[0]);
        }


        for (const order of insertedData) {
          if (!order.cart_items || !Array.isArray(order.cart_items)) continue;
          for (const item of order.cart_items) {
            await updateProduct(item.id, item.quantity);
          }
        }

        // Track purchase
        if (!purchaseTrackedRef.current) {
          trackPurchase(orderData, net, ProductData, {
            name,
            phone,
            gover: selectedGovernorate,
            center: selectedCenter
          });
          purchaseTrackedRef.current = true;
        }

        // Clear cart
        setCartIds({});

        // Save to localStorage
        const savedOrders = JSON.parse(localStorage.getItem("products")) || [];
        savedOrders.push({
          date: new Date().toLocaleString(),
          items: ProductData,
          orderDetils: orderData
        });
        localStorage.setItem("products", JSON.stringify(savedOrders));
        localStorage.setItem('cartIdes', JSON.stringify({}));

        Swal.fire({
          title: "تمام كدا الأوردر اتسجل ✅",
          html: deliveryDuration ? `<p class="font-bold">${deliveryDuration}</p> 
          
            <p class=""> يرجي ترك الهاتف متاح خلال فتره الشحن</p>

            ` : undefined,
          icon: "success",
          showConfirmButton: false,
          // confirmButtonText: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-right: 8px;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg> 01552551414`
        })
        // .then((result) => {
        //   if (result.isConfirmed) {
        //     window.location.href =
        //       `https://api.whatsapp.com/send?phone=201552551414`;
        //   }
        // })

        navigate('/myorder');
        setconfirmOrderLoading(false);


      } catch (err) {
        console.error("❌ Connection error:", err);
        setconfirmOrderLoading(false);
        isSubmittingRef.current = false;
      }
    };



      

    // Check if extra weight fee applies
    
       if (increasWight > 0) {
         const result = await Swal.fire({
           title: "",
           text: `تم اضافة ${Math.ceil(increasWight)}ج رسوم اضافية نظرا لوزن الاوردر ليصبح الاجمالي ${net} لتأكيد ذلك اضغط "تأكيد"`,
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "var(--teal-500)",
           cancelButtonColor: "#d33",
           cancelButtonText: "الغاء",
           confirmButtonText: "تاكيد"
         });
   
         if (result.isConfirmed) {
           await submitOrder();
         }
       } else {
         await submitOrder();
       }
     

     }

  const normalizeArabicNumbers = (input) => {
    if (!input) return "";
    const arabicToEnglish = {
      '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
      '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
    };
    return input.replace(/[٠-٩]/g, (d) => arabicToEnglish[d]);
  };



  // Custom TextField Style
  const textFieldStyle = {
    mb: '24px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontSize: '18px',
      backgroundColor: '#f8f9fa',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(78,196,189,0.15)',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '16px',
      fontWeight: '500',
      '&.Mui-focused': {
        color: 'var(--teal-400)',
      },
    },
  };



  return (
    <>
      {/* Hidden Invoice Modal for generating invoice image */}
      <InvoiceModal
        ref={invoiceRef}
        order={orderForInvoice}
        time={longOfCharge}
      />

      <div className='min-h-screen py-5 px-3 sm:py-14 sm:px-4 mt-[70px] sm:mt-[80px]' style={{background:'linear-gradient(180deg, var(--color-page-bg) 0%, var(--color-page-bg-soft) 100%)'}}>
        <div className='max-w-4xl mx-auto'>

          {/* Header Section */}
          <div className='text-center mb-7 sm:mb-10'>
            <div className='inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 shadow-lg' style={{background:'var(--color-primary-button)', boxShadow:'0 12px 28px rgba(29,122,117,0.18)'}}>
              {/* <FaShoppingCart className='text-white text-xl sm:text-2xl' /> */}
            </div>
            <h1 className='text-2xl sm:text-4xl font-bold text-gray-800 mb-2'>تأكيد الطلب</h1>
            <p className='text-sm sm:text-base text-gray-600 px-4'>يرجى ملء البيانات التالية لإتمام طلبك</p>
          </div>

          {/* Main Form Card */}
          <div className='bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-xl overflow-hidden border' style={{ borderColor: 'var(--color-card-border)' }}>
            <div className='h-1.5 sm:h-2' style={{background:'var(--color-primary-button)'}}></div>

            <div className='p-4 sm:p-8 md:p-10 lg:p-12'>
              <form onSubmit={handleSubmit(getformData)}>

                {/* Personal Info Section */}
                <div className='mb-8 sm:mb-10'>
                  <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7 flex items-center gap-2.5'>
                    <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-white shadow-sm' style={{background:'var(--gradient-brand)'}}>1</span>
                    <span className='text-lg sm:text-2xl'>البيانات الشخصية</span>
                  </h2>

                  <TextField
                    fullWidth
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    type="text"
                    label="الاسم بالكامل"
                    sx={textFieldStyle}
                  />

                  <TextField
                    fullWidth
                    label="رقم الهاتف"
                    type="text" // 👈 
                    sx={textFieldStyle}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    {...register('phone', {
                      onChange: (e) => {
                        let val = normalizeArabicNumbers(e.target.value);
                        e.target.value = (val.startsWith('0') && !val.startsWith('01')) ? val.slice(0, 10) : val.slice(0, 11);
                      },
                    })}
                    inputProps={{ maxLength: 11 }}
                  />


                  <TextField
                    fullWidth
                    label="رقم اخر"
                    type="text"
                    sx={textFieldStyle}
                    error={!!errors.whats}
                    helperText={errors.whats?.message}
                    {...register('whats', {
                      onChange: (e) => {
                        let val = normalizeArabicNumbers(e.target.value);
                        e.target.value = (val.startsWith('0') && !val.startsWith('01')) ? val.slice(0, 10) : val.slice(0, 11);
                      },
                    })}
                    inputProps={{ maxLength: 11 }}
                  />


                </div>

                {/* Address Section */}
                <div className='mb-8 sm:mb-10'>
                  <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7 flex items-center gap-2.5'>
                    <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-white shadow-sm' style={{background:'var(--color-primary-button)'}}>2</span>
                    <span className='text-lg sm:text-2xl'>عنوان التوصيل</span>
                  </h2>

                  {/* Governorate Selection */}
                  <div className="flex flex-col mb-1">
                    <label className={`text-right mb-2 font-bold ${errors.gover ? 'text-red-500' : 'text-gray-700'}`}>المحافظة</label>
                    <Controller
                      name="gover"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputId={field.name}
                          options={governorateOptions}
                          placeholder="اختر المحافظة"
                          isSearchable={true}
                          styles={customSelectStyles}
                          classNamePrefix="react-select"
                          value={governorateOptions.find(o => o.value === selectedGovernorate)}
                          onChange={(val) => {
                            const nextGovernorate = val?.value || '';
                            field.onChange(nextGovernorate);
                            setSelectedGovernorate(nextGovernorate);
                            setSelectedCenter('');
                            setSelectedArea('');
                            setValue('center', '');
                            setValue('mantaq', '');
                            increasWightt();
                          }}
                        />
                      )}
                    />
                    {errors.gover && <span className="text-red-500 text-sm mb-4 text-right">{errors.gover.message}</span>}
                  </div>

                  {/* Center Selection */}
                  <div className="flex flex-col mb-1">
                    <label className={`text-right mb-2 font-bold ${!selectedGovernorate ? 'text-gray-400' : errors.center ? 'text-red-500' : 'text-gray-700'}`}>المركز / المدينة</label>
                    <Controller
                      name="center"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputId={field.name}
                          options={centerOptions}
                          placeholder="اختر المركز"
                          isSearchable={true}
                          isDisabled={!selectedGovernorate}
                          styles={customSelectStyles}
                          value={centerOptions.find(o => o.value === selectedCenter) || null}
                          onChange={(val) => {
                            const nextCenter = val?.value || '';
                            field.onChange(nextCenter);
                            setSelectedCenter(nextCenter);
                            setSelectedArea('');
                            setValue('mantaq', '');
                          }}
                        />
                      )}
                    />
                    {errors.center && <span className="text-red-500 text-sm mb-4 text-right">{errors.center.message}</span>}
                  </div>

                  {/* Zagazig Area Selection */}
                  {areaOptions.length > 0 && (
                    <div className="flex flex-col mb-1">
                      <label className={`text-right mb-2 font-bold ${errors.mantaq ? 'text-red-500' : 'text-gray-700'}`}>
                        المنطقة <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="mantaq"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            inputId={field.name}
                            options={areaOptions}
                            placeholder="اختر المنطقة"
                            isSearchable={true}
                            styles={customSelectStyles}
                            value={areaOptions.find(o => o.value === field.value) || null}
                            onChange={(val) => {
                              const nextArea = val?.value || '';
                              field.onChange(nextArea);
                              setSelectedArea(nextArea);
                            }}
                          />
                        )}
                      />
                      {errors.mantaq && <span className="text-red-500 text-sm mb-4 text-right">{errors.mantaq.message}</span>}
                    </div>
                  )}

                  <TextField
                    {...register('address')}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    fullWidth
                    multiline
                    rows={3}
                    type="text"
                    label="العنوان بالتفاصيل"
                    placeholder="مثال: شارع... - عمارة رقم... - الدور..."
                    sx={textFieldStyle}
                  />
                </div>

                {/* Order Summary Section */}
                <div className='mb-8 sm:mb-10'>
                  <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7 flex items-center gap-2.5'>
                    <span className='w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm' style={{ background:'var(--color-primary-button)' }}>3</span>
                    <span className='text-lg sm:text-2xl'>ملخص الطلب</span>
                  </h2>

                  <div className='rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 border' style={{background:'linear-gradient(135deg,#FFFFFF,#F7FBFB)',borderColor:'var(--color-card-border-strong)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.8)'}}>
                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b-2 border-gray-200'>
                      <div className='flex items-center text-grat-700 gap-1 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold '>جنيه</span>

                        <span className='text-base sm:text-xl font-bold '>{Number(totalPrice)}</span>
                      </div>
                      <span className='text-sm sm:text-lg font-semibold '>الاجمالي قبل الخصم</span>

                    </div>

                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                      <div className='flex items-center gap-1 text-orange-600 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold '>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                          {`${(Number(totalPrice) - Number(totalPriceAfterDicount()))} -`}
                        </span>
                      </div>
                      <span className='text-sm sm:text-lg font-semibold '>قيمه الخصم</span>
                    </div>

                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                      <div className='flex items-center gap-1 text-gray-700 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold'>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                          {Math.round(Number(totalPriceAfterDicount()))}
                        </span>
                      </div>
                      <span className='text-sm sm:text-lg font-semibold '>الإجمالي بعد الخصم</span>
                    </div>

                    <div className='flex justify-between items-center pb-2 sm:pb-3 border-b border-gray-200'>
                      <div className='flex items-center gap-1 text-gray-700 sm:gap-2'>
                        <span className='text-sm sm:text-base font-bold'>جنيه</span>
                        <span className='text-base sm:text-xl font-bold '>
                          {Math.round(Number(msarefElchange))}
                        </span>
                      </div>
                      <span className='text-sm sm:text-lg font-semibold text-gray-700'>مصاريف الشحن</span>
                    </div>
                    <div className='flex justify-between items-center pt-2 sm:pt-3 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 px-4 sm:px-6 py-3.5 sm:py-4 rounded-b-xl sm:rounded-b-2xl border-t-4' style={{ background:'linear-gradient(135deg,#F2FBFA,#E8F7F5)', borderColor:'var(--teal-300)' }}>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <span className='text-lg sm:text-xl font-semibold text-green-700'>جنيه</span>

                        <span className='text-2xl sm:text-3xl font-bold text-green-700'>
                          {Math.round(Number(totalPriceAfterDicount()) + Number(msarefElchange))}
                        </span>
                      </div>
                      <span className='text-lg sm:text-xl font-bold text-green-800'>  الإجمالي النهائي</span>

                    </div>
                  </div>

                  {longOfCharge && (
                    <div className='mt-4 sm:mt-5 rounded-xl p-3.5 sm:p-4 border' style={{background:'var(--color-surface-muted)',borderColor:'var(--color-card-border-strong)'}}>
                      <p className='font-medium text-right text-sm sm:text-base' style={{color:'var(--teal-700)'}}>{longOfCharge}</p>

                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  className='w-full text-white font-bold text-lg sm:text-xl py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg transform transition duration-300 active:scale-95 sm:hover:scale-[1.015] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 sm:gap-3'
                  style={{background:'var(--color-primary-button)', boxShadow:'0 18px 34px rgba(29,122,117,0.22)'}}
                  disabled={confirmOrderLoading}
                >
                  {confirmOrderLoading ? (
                    <>
                      <IconLoading size={22} className='animate-spin' />
                      <span>  جاري تسجيل الأوردر...</span>
                    </>
                  ) : (
                    <>
                      <span>تأكيد الطلب</span>
                      <IconArrowLeft size={20} />
                    </>
                  )}
                </button>

                <div className='mt-3 sm:mt-4 text-center'>
                  <p className='text-xs sm:text-sm text-gray-500 px-2'>
                    بالضغط على "تأكيد الطلب" فإنك توافق على شروط وأحكام الخدمة
                  </p>
                </div>

              </form>
            </div>
          </div>

          {/* Trust Badges */}
          <div className='mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center'>
            <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor:'var(--color-card-border)' }}>
              {/* <div className='text-2xl sm:text-3xl mb-1 sm:mb-2'>🚚</div> */}
              <p className='text-xs sm:text-sm font-semibold text-gray-700'> 🚚 توصيل لحد باب البيت</p>
            </div>
            <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor:'var(--color-card-border)' }}>
              {/* <div className='text-2xl sm:text-3xl mb-1 sm:mb-2'>💳</div> */}
              {/* <div className='text-2xl sm:text-3xl mb-1 sm:mb-2'>💵</div> */}
              <p className='text-xs sm:text-sm font-semibold text-gray-700'>  💵 الدفع عند الاستلام

              </p>
            </div>
            <div className='bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-md border' style={{ borderColor:'var(--color-card-border)' }}>
              {/* <div className='text-2xl sm:text-3xl mb-1 sm:mb-2'></div> */}
              <p className='text-xs sm:text-sm font-semibold text-gray-700'> ✅ ضمان الجوده </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
