import z from 'zod'

export const escema = z.object({
  name: z.string({ required_error: "يجب إدخال الاسم" }).min(3, { message: 'الاسم قصير جداً' }),
  address: z.string({ required_error: "يجب إدخال العنوان" }).min(6, { message: 'العنوان قصير جداً' }),
  gover: z.string({ required_error: "يجب اختيار المحافظة" }).min(1, { message: 'يجب اختيار المحافظة' }),
  center: z.string({ required_error: "يجب اختيار المركز" }).min(1, { message: 'يجب اختيار المركز' }),
  mantaq: z.string().optional(),
  phone: z.string({ required_error: "يجب إدخال رقم الهاتف" }).regex(
    /^(?:01[0125]\d{8}|0[2-9]\d{8})$/,
    { message: "رقم الهاتف غير صالح، مثال: 01012345678 أو 0552505850" }
  ),
  whats: z.string({ required_error: "يجب إدخال رقم الهاتف الآخر" }).regex(
    /^(?:01[0125]\d{8}|0[2-9]\d{8})$/,
    { message: "رقم الهاتف غير صالح، مثال: 01012345678 أو 0552505850" }
  ),
})

export const getDynamicSchema = (hasAreas) => {
  if (hasAreas) {
    return escema.extend({
      mantaq: z.string({ required_error: "يجب اختيار المنطقة" }).min(1, { message: 'يجب اختيار المنطقة' })
    });
  }
  return escema;
}
