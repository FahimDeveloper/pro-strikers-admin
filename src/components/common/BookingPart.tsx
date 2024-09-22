/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";
import {
  useAddToCartSlotMutation,
  useDeleteBookingSlotMutation,
} from "../../redux/features/slotBooking/slotBookingApi";
import DateSlider from "./DateSlider";
import FacilityBookingTimeSlots from "./FacilityBookingTimeSlots";
import OneTrainingBookingTimeSlots from "./OneTrainingBookingTimeSlots";

const BookingPart = ({
  data,
  selectSlots,
  setSelectSlots,
  activeDate,
  setActiveDate,
  slotsCartQuery,
  slotsBookedQuery,
  lane,
}: {
  data: any;
  selectSlots: any;
  setSelectSlots: any;
  activeDate: any;
  setActiveDate: any;
  slotsCartQuery: any;
  slotsBookedQuery: any;
  lane?: string;
}) => {
  const createCartBooking = useAddToCartSlotMutation();
  const [deleteSlot] = useDeleteBookingSlotMutation();
  const onDelete = (date: any, slot: any) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0ABAC3",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const slotId = `${data?.results._id}${
          date.toISOString().split("T")[0]
        }${slot.split(" ").join("")}`;
        deleteSlot(slotId)
          .unwrap()
          .then(() => {
            toast.success("Deleted successfully");
            const updatedSlots = selectSlots
              ?.map((slots: any) => {
                if (slots.date === date && slots.slots.length > 1) {
                  return {
                    ...slots,
                    slots: slots.slots.filter(
                      (oldSlot: string) => oldSlot !== slot
                    ),
                  };
                } else if (slots.date === date && slots.slots.length == 1) {
                  return null;
                }
                return slots;
              })
              .filter(Boolean);
            setSelectSlots(updatedSlots);
          })
          .catch((error: any) => toast.error(`${error.data.message}`));
      }
    });
  };
  const totalPrice = selectSlots.reduce((total: number, appointment: any) => {
    return total + appointment.slots.length * data?.results.price;
  }, 0);
  return (
    <div className="bg-[#F9FAFB] py-10 rounded-2xl space-y-6 px-5">
      <div className="space-y-2">
        <p className="text-lg text-[#07133D] font-medium text-center">
          {activeDate.toLocaleDateString("en-US", { month: "long" })}
        </p>
        <DateSlider activeDate={activeDate} setActiveDate={setActiveDate} />
      </div>
      {data?.results && lane ? (
        <FacilityBookingTimeSlots
          activeDate={activeDate}
          training={data?.results}
          slotsCartQuery={slotsCartQuery}
          slotsBookedQuery={slotsBookedQuery}
          addToCart={createCartBooking}
          selectSlots={selectSlots}
          setSelectSlots={setSelectSlots}
          lane={lane}
        />
      ) : (
        <OneTrainingBookingTimeSlots
          activeDate={activeDate}
          training={data?.results}
          slotsCartQuery={slotsCartQuery}
          slotsBookedQuery={slotsBookedQuery}
          addToCart={createCartBooking}
          selectSlots={selectSlots}
          setSelectSlots={setSelectSlots}
        />
      )}
      {selectSlots.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#07133D]">
              Booking Details
            </h3>
            <p className="text-base">Total Price: ${totalPrice}</p>
          </div>
          <div className="space-y-2">
            {selectSlots.map((dateSlots: any, index: number) => (
              <div className="space-y-2" key={index}>
                {dateSlots.slots.map((slot: string, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3"
                  >
                    <div className="flex gap-5 items-center">
                      <IoCalendarOutline className="size-4" />
                      <span className="text-sm font-medium text-[#07133D]">
                        {moment(dateSlots.date).format("D-MMM-YYYY")}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      {slot}
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      ${data?.results?.price}
                    </div>
                    <MdDeleteOutline
                      className="size-5 cursor-pointer"
                      onClick={() => onDelete(dateSlots.date, slot)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPart;
