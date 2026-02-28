export type PaymentBreakdown = {
  projectValue: number;
  commission: number;
  gstOnCommission: number;
  gatewayFee: number;
  freelancerPayout: number;
  clientTotal: number;
  platformNetRevenue: number;
};

export const COMMISSION_RATE = 0.15;
export const GST_RATE = 0.18;
export const GATEWAY_RATE = 0.02;

const toINR = (value: number) => Number(value.toFixed(2));

export function calculatePaymentBreakdown(projectValue: number): PaymentBreakdown {
  const commission = toINR(projectValue * COMMISSION_RATE);
  const gstOnCommission = toINR(commission * GST_RATE);
  const gatewayFee = toINR(projectValue * GATEWAY_RATE);
  const freelancerPayout = toINR(projectValue - commission - gstOnCommission);
  const clientTotal = toINR(projectValue + gatewayFee);
  const platformNetRevenue = toINR(commission - gstOnCommission);

  return {
    projectValue: toINR(projectValue),
    commission,
    gstOnCommission,
    gatewayFee,
    freelancerPayout,
    clientTotal,
    platformNetRevenue,
  };
}
