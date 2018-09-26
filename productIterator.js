
import { StackActions } from "react-navigation";

export default function* productIterator(allProducts) {

  let sdpPricing, paymentOption;
  const { product } = yield showProductDetails(allProducts);

  if (product.hasSdpOption) {

    const { selectedSdp } = yield showSdpPage(product);

    if (selectedSdp) {
      sdpPricing = yield showSdpPricingPage(product)
    }
  }

  if (product.hasPaymentOptions) {
    paymentOption = yield showPaymentOptionsPage(product);
  }

  yield showSummaryPage(product, sdpPricing, paymentOption);
}
