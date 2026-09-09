import { useAuthStore } from "@/auth/store/auth.store";
import { useMyPayments } from "@/admin/payments/hooks/useMyPayments";
import { useEventsApi } from "@/admin/events/hooks/useEventsApi";

import { WelcomeCard } from "../components/WelcomeCard";
import { PropertyInfoCard } from "../components/PropertyInfoCard";
import { PaymentSection } from "../components/PaymentSection";
import { CommunitySection } from "../components/CommunitySection";
import { QuickContactCard } from "../components/QuickContactCard";

export function HomePage() {
  const user = useAuthStore((state) => state.user);

  const {
    payments,
    isLoading: isPaymentsLoading,
  } = useMyPayments();

  const {
    eventsQuery,
  } = useEventsApi();

  const userApartment =
    user?.person?.apartment_people?.[0]?.apartment;

  const propertyInfo = {
    unit: userApartment?.code || "N/A",

    floor:
      userApartment?.code
        ?.split("-")[1]
        ?.slice(0, -2) || "N/A",

    area: userApartment?.area
      ? `${userApartment.area}m²`
      : "N/A",

    bedrooms: "2",
    bathrooms: "2",
    parking: "2",
  };

  //console.log(user);

  return (
    <div className="space-y-6">
      <WelcomeCard
        unit={propertyInfo.unit}
      />

      <PropertyInfoCard
        unit={propertyInfo.unit}
        floor={propertyInfo.floor}
        area={propertyInfo.area}
        bedrooms={propertyInfo.bedrooms}
        bathrooms={propertyInfo.bathrooms}
        parking={propertyInfo.parking}
      />

      <PaymentSection
        payments={payments}
        isLoading={isPaymentsLoading}
      />

      <CommunitySection
        events={eventsQuery.data ?? []}
        eventsLoading={eventsQuery.isLoading}
        payments={payments}
        paymentsLoading={isPaymentsLoading}
      />

      <QuickContactCard />
    </div>
  );
}