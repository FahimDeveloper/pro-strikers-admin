/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  useAddToCartFacilityMutation,
  useDeleteCartFacilityMutation,
  useGetFacilityReservationCartQuery,
} from "../../../../redux/features/reservation/facilityReservation";
import DateSlider from "../../../../components/common/DateSlider";
import BookingTimeSlots from "../../../../components/common/BookingTimeSlots";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";

const BookingPart = ({
  rentalFacility,
  selectSlots,
  setSelectSlots,
}: {
  rentalFacility: any;
  selectSlots: any;
  setSelectSlots: any;
}) => {
  const createCartBooking = useAddToCartFacilityMutation();
  const [deleteSlot] = useDeleteCartFacilityMutation();

  const [activeDate, setActiveDate] = useState(new Date());
  const reservationCartsQuery = useGetFacilityReservationCartQuery(
    {
      facility: rentalFacility?._id,
      date: activeDate.toISOString().split("T")[0],
    },
    { skip: rentalFacility?.results ? false : true }
  );

  const onDelete = (date: any, slot: any) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0ABAC3",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const timeSlot = reservationCartsQuery.data?.results?.find(
          (carts: any) => carts.time_slot === slot
        );
        if (timeSlot) {
          deleteSlot(timeSlot._id)
            .unwrap()
            .then(() => {
              toast.success("Deleted successfully");
              const updatedSlots = selectSlots
                .map((slots: any) => {
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
            .catch((error: any) => toast.success(`${error.data.message}`));
        }
      }
    });
  };
  return (
    <div className="bg-[#F9FAFB] py-10 rounded-2xl space-y-6 px-5">
      {rentalFacility?.results && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#07133D]">
            Booking Date and Time
          </h3>
          <div className="flex justify-between">
            <div className="flex gap-x-5 items-center">
              <div className="flex gap-x-2 items-center">
                <span className="size-3 rounded-full border border-solid border-gray-300"></span>
                Available
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="size-3 rounded-full bg-primary border border-solid border-gray-300"></span>
                Selected
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="size-3 rounded-full border bg-gray-100 border-solid border-gray-300"></span>
                Unavailable
              </div>
            </div>
            <div>Facility lane: {rentalFacility.results.lane}</div>
            <div>
              Per slot fee:
              <span className="font-medium">
                ${rentalFacility.results.price}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-[#07133D] font-medium text-center">
              {activeDate.toLocaleDateString("en-US", { month: "long" })}
            </p>
            <DateSlider activeDate={activeDate} setActiveDate={setActiveDate} />
          </div>
          <BookingTimeSlots
            activeDate={activeDate}
            facility={rentalFacility?.results}
            cartsQuery={reservationCartsQuery}
            addToCart={createCartBooking}
            selectSlots={selectSlots}
            setSelectSlots={setSelectSlots}
          />
        </div>
      )}
      {selectSlots.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-[#07133D]">
              Booking Details
            </h3>
            <div className="text-base font-medium">
              Total Fee: $
              {selectSlots.reduce(
                (acc: number, curr: any) =>
                  acc + curr.slots.length * rentalFacility.results.price,
                0
              )}
            </div>
          </div>
          <div className="space-y-2">
            {selectSlots?.map((dateSlots: any, index: number) => (
              <div className="space-y-2" key={index}>
                {dateSlots?.slots.map((slot: string, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white p-3"
                  >
                    <div className="flex gap-5 items-center">
                      <IoCalendarOutline className="size-4" />
                      <span className="text-sm font-medium text-[#07133D]">
                        {moment(dateSlots?.date).format("D-MMM-YYYY")}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      {slot}
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      ${rentalFacility?.results?.price}
                    </div>
                    <MdDeleteOutline
                      className="size-5 cursor-pointer"
                      onClick={() => onDelete(dateSlots?.date, slot)}
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
