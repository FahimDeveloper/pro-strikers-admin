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

const OneTrainingBookingTimeSlots = ({
  activeDate,
  training,
  slotsCartQuery,
  addToCart,
  selectSlots,
  setSelectSlots,
  slotsBookedQuery,
}: {
  activeDate: Date;
  training: any;
  slotsCartQuery: any;
  slotsBookedQuery: any;
  addToCart: any;
  selectSlots: any;
  setSelectSlots: any;
}) => {
  const [create, { isLoading: createLoading, isSuccess, isError, error }] =
    addToCart;
  const { data: slotsCartData, isLoading: slotsCartLoading } = slotsCartQuery;
  const { data: slotsBookedData, isLoading: slotsBookedLoading } =
    slotsBookedQuery;
  const [timeSlot, setTimeSlot] = useState("");
  const [slotIndex, setSlotIndex] = useState<number | null>(null);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();
  const day = useMemo(() => {
    if (activeDate < new Date()) {
      return;
    } else {
      return training?.schedules?.find(
        (schedule: any) =>
          schedule.day ===
          activeDate.toLocaleDateString("en-US", { weekday: "long" })
      );
    }
  }, [training, activeDate]);

  const slots = useMemo(() => {
    if (day && day.active) {
      return createTimeSlots(day.start_time, day.end_time, training.duration);
    }
    return [];
  }, [day, training.duration]);

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
      const date = activeDate.toISOString().split("T")[0];
      setTimeSlot(value);
      setSlotIndex(index);
      create({
        id: `${training._id}${date}${value.split(" ").join("")}`,
        training: training._id,
        user: user?._id,
        date,
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

  const cartSlots = collectBookingTimeSlots(slotsCartData?.results);
  const bookedSlots = collectBookingTimeSlots(slotsBookedData?.results);
  const unavailableSlots = [...cartSlots, ...bookedSlots];

  return (
    <>
      {slots?.length > 0 ? (
        <div className="grid grid-cols-5 gap-1">
          {(slots as string[]).map((slot, index) => (
            <button
              disabled={
                createLoading ||
                slotsCartLoading ||
                slotsBookedLoading ||
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
              className={`border border-solid rounded-md border-gray-200 h-12 px-1 disabled:cursor-not-allowed text-center ${
                createLoading || slotsCartLoading || slotsBookedLoading
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
              {(createLoading || slotsCartLoading || slotsBookedLoading) &&
              index === slotIndex ? (
                <FaSpinner className="animate-spin size-5 text-primary" />
              ) : (
                <p className="text-xs font-medium">
                  {!selectSlots.find((slots: any) =>
                    slots.slots.includes(slot)
                  ) && unavailableSlots.includes(slot)
                    ? "Unavailable"
                    : slot}
                </p>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-2xl h-40 items-center justify-center flex font-semibold">
          No slot available in this date
        </p>
      )}
    </>
  );
};

export default OneTrainingBookingTimeSlots;
