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
import { Button, InputNumber, Radio } from "antd";
import { IAddon } from "../../types/addon.types";

const BookingPart = ({
  data,
  selectSlots,
  setSelectSlots,
  activeDate,
  setActiveDate,
  slotsCartQuery,
  slotsBookedQuery,
  lane,
  setLane,
  addons,
  setAddons,
  addonsData,
}: {
  data: any;
  selectSlots: any;
  setSelectSlots: any;
  activeDate: any;
  setActiveDate: any;
  slotsCartQuery: any;
  slotsBookedQuery: any;
  lane?: string;
  setLane?: any;
  addons?: any;
  setAddons?: any;
  addonsData?: any;
}) => {
  const createCartBooking = useAddToCartSlotMutation();
  const [deleteSlot] = useDeleteBookingSlotMutation();
  const onDelete = (date: any, slot: any, slot_lane?: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0ABAC3",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        let slotId;
        if (lane) {
          slotId = `${data?.results._id}${
            date.toISOString().split("T")[0]
          }${slot.split(" ").join("")}${slot_lane}`;
        } else {
          slotId = `${data?.results._id}${
            date.toISOString().split("T")[0]
          }${slot.split(" ").join("")}`;
        }
        deleteSlot(slotId)
          .unwrap()
          .then(() => {
            toast.success("Deleted successfully");
            const updatedSlots = selectSlots
              ?.map((slots: any) => {
                if (
                  slots.date === date &&
                  slots.lane === slot_lane &&
                  slots.slots.length > 1
                ) {
                  return {
                    ...slots,
                    slots: slots.slots.filter(
                      (oldSlot: string) => oldSlot !== slot
                    ),
                  };
                } else if (
                  slots.date === date &&
                  slots.lane === slot_lane &&
                  slots.slots.length == 1
                ) {
                  return null;
                }
                return slots;
              })
              .filter(Boolean);
            setSelectSlots(updatedSlots);
          })
          .catch((error) => toast.error(`${error.data.message}`));
      }
    });
  };

  const onAddAddon = (values: any) => {
    setAddons([
      ...addons,
      {
        id: addons?.length,
        image: values.addon_image,
        name: values.addon_title,
        ini_price: values.addon_ini_price,
        price: values.addon_price,
        hours: 1,
      },
    ]);
  };

  const onHourChange = (value: number, id: number) => {
    setAddons(
      addons.map((addon: any) =>
        addon.id === id ? { ...addon, hours: value } : addon
      )
    );
  };

  const onAddonDelete = (id: number) => {
    setAddons(addons.filter((addon: any) => addon.id !== id));
  };

  const addonsPrice = addons?.reduce((total: number, addon: any) => {
    const firstHourPrice = addon?.ini_price;
    const remainingHoursPrice = (addon?.hours - 1) * addon?.price;
    return total + firstHourPrice + remainingHoursPrice;
  }, 0);

  const slotsPrice = selectSlots?.reduce((total: number, appointment: any) => {
    if (lane) {
      if (appointment.slots.length > 2) {
        const baseSlotPrice = data?.results?.ini_price;
        const additionalSlotPrice =
          (appointment.slots.length - 2) * data?.results.price;
        return total + baseSlotPrice * 2 + additionalSlotPrice;
      } else {
        return total + appointment.slots.length * data?.results?.ini_price;
      }
    } else {
      return total + appointment.slots.length * data?.results?.price;
    }
  }, 0);
  return (
    <div className="bg-[#F9FAFB] py-5 rounded-2xl space-y-4 px-5">
      {lane && (
        <>
          <h3 className="text-xl font-semibold text-[#07133D]">Select Area</h3>
          <div className="flex gap-5">
            <Radio.Group
              onChange={(e) => setLane(e.target.value)}
              value={lane}
              className="w-full"
            >
              <div className="w-full flex flex-col gap-2">
                {data?.results?.lanes.map((lane: string) => (
                  <div className="w-full bg-gray-100 px-2 py-2 rounded-lg">
                    <Radio
                      value={lane}
                      className="w-full font-medium capitalize"
                    >
                      {lane}
                    </Radio>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </div>
          <p className="text-base font-medium">
            Information - {data?.results?.description}
          </p>
          <div className="flex gap-5">
            <div className="flex gap-1">
              Base slot fee:
              <span className="font-medium">${data.results.ini_price}</span>
            </div>
            <div className="flex gap-1">
              Additional slot fee:
              <span className="font-medium">${data.results.price}</span>
            </div>
          </div>
        </>
      )}
      <div className="space-y-2">
        <p className="text-lg text-[#07133D] font-medium text-center">
          {activeDate.toLocaleDateString("en-US", { month: "long" })}
        </p>
        <DateSlider activeDate={activeDate} setActiveDate={setActiveDate} />
      </div>
      {data?.results && lane ? (
        <>
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
        </>
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
            <p className="text-base">
              Total Price: ${lane ? addonsPrice + slotsPrice : slotsPrice}
            </p>
          </div>
          {(addonsData?.results as IAddon)?.addons?.map((addon, index) => (
            <div key={index} className="grid grid-cols-3 items-end">
              <div className="flex gap-5 col-span-2 items-center">
                <img
                  src={addon.addon_image}
                  className="size-16 rounded-xl"
                  alt={addon.addon_title}
                />
                <div className="space-y-2">
                  <h4 className="text-lg text-[#07133D] font-medium">
                    {addon.addon_title}
                  </h4>
                  <p className="text-sm text-primary font-semibold">
                    First hour ${addon.addon_ini_price}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    Additional +${addon.addon_price}/hours
                  </p>
                </div>
              </div>
              <div className="text-end">
                <Button
                  onClick={() => onAddAddon(addon)}
                  disabled={
                    addons.find((a: any) => a.name === addon.addon_title)
                      ? true
                      : false
                  }
                  className="bg-[#07133D] px-4 h-8 text-white"
                >
                  + Add
                </Button>
              </div>
            </div>
          ))}
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
                      {dateSlots.lane}
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      {slot}
                    </div>
                    <div className="text-sm font-medium text-[#07133D]">
                      ${data?.results?.price}
                    </div>
                    <MdDeleteOutline
                      className="size-5 cursor-pointer"
                      onClick={() =>
                        onDelete(dateSlots.date, slot, dateSlots.lane)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
            {addons?.map((addon: any) => {
              const totalAddonPrice =
                addon.hours > 1
                  ? addon.ini_price + (addon.hours - 1) * addon.price
                  : addon.ini_price;
              return (
                <div
                  className="flex justify-between items-center px-2"
                  key={addon.id}
                >
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="size-16 rounded-xl"
                  />
                  <p>
                    Hours:
                    <InputNumber
                      value={addon.hours}
                      min={1}
                      onChange={(value) => onHourChange(value, addon.id)}
                      className="w-16"
                    />
                  </p>
                  <p>${totalAddonPrice}</p>
                  <MdDeleteOutline
                    onClick={() => onAddonDelete(addon.id)}
                    className="size-5 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPart;
