// helper to calculate highest discount for a single product based on offers list
export function getItemDiscount(item, offersList) {
  if (!offersList || !item) return { percentage: 0, amount: 0 };

  let maxPerc = 0;

  for (const offer of offersList) {
    if (offer.status !== 'نشط') continue;
    if (offer.offer_type !== 'discount') continue;

    let eligible = false;
    if (offer.target_type === 'all') {
      eligible = true;
    } else if (offer.target_type === 'year') {
      const allowedYears = offer.target_value ? offer.target_value.split(' و ') : [];
      eligible = allowedYears.includes(`${item.category}_${item.level}`);
    } else if (offer.target_type === 'category') {
      const allowedCats = offer.category ? offer.category.split(' و ') : [];
      eligible = allowedCats.includes(item.category);
    }

    if (!eligible) continue;

    const eligibleTotal = (item.price || 0) * (item.quantity || 1);
    if (offer.min_purchase && eligibleTotal < offer.min_purchase) continue;

    const perc = Number(offer.discount_value) || 0;
    if (perc > maxPerc) maxPerc = perc;
  }

  const amount = Math.ceil((item.price || 0) * (maxPerc / 100));
  return { percentage: maxPerc, amount };
}
