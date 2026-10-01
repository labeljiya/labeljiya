export type GstResult = {
  salePrice: number;
  gstRate: number;
  taxableValue: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
};

export const SELLER_STATE = "Karnataka";
export const SELLER_STATE_CODE = "29";

export const SELLER_GST = {
  legalName: "CHITRA CHOUDHARY",
  tradeName: "LABEL JIYA",
  gstin: "29CCEPC8543A1ZV",
  hsn: "6211",
  address: "267, KASABA HOBLI, Haralahalli Road",
  locality: "Dasarakoppal",
  city: "Hassan",
  state: "Karnataka",
  pincode: "573202",
};

export function getGstRate(salePricePerPiece: number) {
  return salePricePerPiece <= 2500 ? 5 : 18;
}

/**
 * Product prices on LABEL JIYA already include GST.
 *
 * Example:
 * ₹9,598 at 18% GST
 * taxable value = 9598 / 1.18
 */
export function calculateGst(
  salePricePerPiece: number,
  quantity: number,
  isInterState: boolean
): GstResult {
  const gstRate = getGstRate(salePricePerPiece);

  const totalSaleValue = salePricePerPiece * quantity;

  const taxableValue =
    totalSaleValue / (1 + gstRate / 100);

  const gstAmount = totalSaleValue - taxableValue;

  const roundedTaxableValue = Number(
    taxableValue.toFixed(2)
  );

  const roundedGstAmount = Number(
    gstAmount.toFixed(2)
  );

  if (isInterState) {
    return {
      salePrice: totalSaleValue,
      gstRate,
      taxableValue: roundedTaxableValue,
      gstAmount: roundedGstAmount,
      cgst: 0,
      sgst: 0,
      igst: roundedGstAmount,
    };
  }

  const cgst = Number(
    (roundedGstAmount / 2).toFixed(2)
  );

  const sgst = Number(
    (roundedGstAmount - cgst).toFixed(2)
  );

  return {
    salePrice: totalSaleValue,
    gstRate,
    taxableValue: roundedTaxableValue,
    gstAmount: roundedGstAmount,
    cgst,
    sgst,
    igst: 0,
  };
}

export function isInterStateSupply(customerState: string) {
  return (
    customerState.trim().toLowerCase() !==
    SELLER_STATE.toLowerCase()
  );
}