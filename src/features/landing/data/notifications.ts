import orderIcon from "@/assets/DeliveryNotificationsCardIcons/order.png"
import onTheWayIcon from "@/assets/DeliveryNotificationsCardIcons/on-the-way.png"
import checkIcon from "@/assets/DeliveryNotificationsCardIcons/check.png"
import orderCreatedIcon from "@/assets/DeliveryNotificationsCardIcons/order-created.png"
import deliveryCourierIcon from "@/assets/DeliveryNotificationsCardIcons/delivery-courier.png"

export const DELIVERY_NOTIFICATIONS = [
  {
    icon: orderIcon,
    title: "Bidhaa Imechukuliwa",
    body: "Habari njema! Oda yako imechukuliwa na sasa iko njiani kuja kwako. Fuatilia delivery yako moja kwa moja.",
  },
  {
    icon: onTheWayIcon,
    title: "Iko Njiani",
    body: "Habari njema! Oda yako iko njiani sasa na inatarajiwa kufika hivi karibuni. Namba: MOV-20260103-DNZ",
  },
  {
    icon: checkIcon,
    title: "Oda Imekabidhiwa",
    body: "Oda yako imefikishwa kwa mafanikio eneo la Goba Njia Nne. Asante kwa kuamini na kutuchagua Moova!",
  },
  {
    icon: orderCreatedIcon,
    title: "Oda Imetengenezwa",
    body: "Habari! Tumepokea oda yako kutoka Mwanga_Shop. Namba: MOV-20260103-DNZ. Bidhaa: Bags. Gharama: TZS 3,000",
  },
  {
    icon: deliveryCourierIcon,
    title: "Dereva Amechaguliwa",
    body: "Habari njema! Salvatory Yonah amechaguliwa kusafirisha oda yako. Plate: MC 124. Fuatilia: moova.co.tz",
  },
] as const