/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import { createTimeSlots } from "../../utils/createBookingTimeSlots";
import { collectBookingTimeSlots } from "../../utils/collectBookingTimeSlots";

const BookingTimeSlots = ({
  activeDate,
  facility,
  cartsQuery,
  addToCart,
  selectSlots,
  setSelectSlots,
}: {
  activeDate: Date;
  facility: any;
  cartsQuery: any;
  addToCart: any;
  selectSlots: any;
  setSelectSlots: any;
}) => {
  const [create, { isLoading: createLoading, isSuccess, isError, error }] =
    addToCart;
  const { data: cartsData, isLoading: cartsLoading } = cartsQuery;
  const [timeSlot, setTimeSlot] = useState("");
  const [slotIndex, setSlotIndex] = useState<number | null>(null);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();
  const day = useMemo(
    () =>
      facility?.schedules?.find(
        (schedule: any) =>
          schedule.day ===
          activeDate.toLocaleDateString("en-US", { weekday: "long" })
      ),
    [facility, activeDate]
  );

  const slots = useMemo(() => {
    if (day && day.active) {
      return createTimeSlots(
        day.start_time,
        day.end_time,
        facility.facility_duration
      );
    }
    return [];
  }, [day, facility.facility_duration]);

  const onSelect = (value: string, index: number) => {
    if (!user && !token) {
      Swal.fire({
        title: "Login First",
        text: "You need to login",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#0ABAC3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go for login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    } else {
      setTimeSlot(value);
      setSlotIndex(index);
      create({
        facility: facility._id,
        user: user?._id,
        date: activeDate.toISOString().split("T")[0],
        time_slot: value,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("success");
      setSlotIndex(null);
      const dateSlotIndex = selectSlots.findIndex(
        (slots: any) =>
          slots.date.toISOString().split("T")[0] ===
          activeDate.toISOString().split("T")[0]
      );
      if (dateSlotIndex !== -1) {
        selectSlots[dateSlotIndex].slots.push(timeSlot);
        setSelectSlots([...selectSlots]);
      } else {
        setSelectSlots([
          ...selectSlots,
          { date: activeDate, slots: [timeSlot] },
        ]);
      }
    }
    if (isError) {
      setSlotIndex(null);
      Swal.fire({
        title: "Oops!..",
        icon: "info",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isSuccess, isError, error]);

  const unavailableSlots = collectBookingTimeSlots(cartsData?.results);

  return (
    <div className="grid grid-cols-5 gap-1">
      {slots.map((slot, index) => (
        <button
          disabled={
            createLoading ||
            cartsLoading ||
            unavailableSlots.includes(slot) ||
            selectSlots.find(
              (slots: any) =>
                slots.date.toISOString().split("T")[0] ===
                  activeDate.toISOString().split("T")[0] &&
                slots.slots.includes(slot)
            )
          }
          key={index}
          onClick={() => onSelect(slot, index)}
          className={`border border-solid rounded-md border-gray-200 py-4 px-1 disabled:cursor-not-allowed text-center ${
            createLoading || cartsLoading
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } ${
            selectSlots.find(
              (slots: any) =>
                slots.date.toISOString().split("T")[0] ===
                  activeDate.toISOString().split("T")[0] &&
                slots.slots.includes(slot)
            )
              ? "bg-primary text-white"
              : unavailableSlots.includes(slot)
              ? "bg-gray-100"
              : "bg-white"
          }`}
        >
          {(createLoading || cartsLoading) && index === slotIndex ? (
            <FaSpinner className="animate-spin size-3 text-white" />
          ) : (
            <p className="text-xs font-medium">
              {!selectSlots.find((slots: any) => slots.slots.includes(slot)) &&
              unavailableSlots.includes(slot)
                ? "Unavailable"
                : slot}
            </p>
          )}
        </button>
      ))}
    </div>
  );
};

export default BookingTimeSlots;
