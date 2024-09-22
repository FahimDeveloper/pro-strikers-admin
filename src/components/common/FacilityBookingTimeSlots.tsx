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

const FacilityBookingTimeSlots = ({
  activeDate,
  training,
  slotsCartQuery,
  addToCart,
  selectSlots,
  setSelectSlots,
  slotsBookedQuery,
  lane,
}: {
  activeDate: Date;
  training: any;
  slotsCartQuery: any;
  slotsBookedQuery: any;
  addToCart: any;
  selectSlots: any;
  setSelectSlots: any;
  lane: string | undefined;
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
  const date = new Date();
  const day = useMemo(() => {
    if (
      activeDate.getDate() < date.getDate() &&
      activeDate.getMonth() <= date.getMonth()
    ) {
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
      return createTimeSlots(
        day.start_time,
        day.end_time,
        training.duration,
        lane
      );
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
        id: `${training._id}${date}${value.split(" ").join("")}${lane}`,
        training: training._id,
        user: user?._id,
        date,
        time_slot: value,
        lane,
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
            activeDate.toISOString().split("T")[0] && slots.lane === lane
      );
      if (dateSlotIndex !== -1) {
        selectSlots[dateSlotIndex].slots.push(timeSlot);
        setSelectSlots([...selectSlots]);
      } else {
        setSelectSlots([
          ...selectSlots,
          { date: activeDate, slots: [timeSlot], lane: lane },
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

  const cartSlots = collectBookingTimeSlots(slotsCartData?.results, lane);
  const bookedSlots = collectBookingTimeSlots(slotsBookedData?.results, lane);
  const unavailableSlots = [...cartSlots, ...bookedSlots];
  return (
    <>
      {slots?.length > 0 ? (
        <div className="grid grid-cols-5 gap-1">
          {(
            slots as [
              {
                lane: string;
                slots: string[];
              }
            ]
          )[0].slots?.map((slot: string, index: number) => (
            <button
              disabled={
                createLoading ||
                slotsCartLoading ||
                slotsBookedLoading ||
                unavailableSlots.find(
                  (unAvailable) =>
                    unAvailable.lane === lane &&
                    unAvailable.slots.includes(slot)
                ) ||
                selectSlots.find(
                  (slots: any) =>
                    slots.date.toISOString().split("T")[0] ===
                      activeDate.toISOString().split("T")[0] &&
                    slots.slots.includes(slot) &&
                    slots.lane === lane
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
                    slots.lane === lane &&
                    slots.slots.includes(slot)
                )
                  ? "bg-primary text-white"
                  : unavailableSlots.find(
                      (unAvailable) =>
                        unAvailable.lane === lane &&
                        unAvailable.slots.includes(slot)
                    )
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
                  ) &&
                  unavailableSlots.find(
                    (unAvailable) =>
                      unAvailable.lane === lane &&
                      unAvailable.slots.includes(slot)
                  )
                    ? "Unavailable"
                    : slot}
                </p>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-2xl h-40 items-center justify-center flex font-semibold">
          No slot available
        </p>
      )}
    </>
  );
};

export default FacilityBookingTimeSlots;
