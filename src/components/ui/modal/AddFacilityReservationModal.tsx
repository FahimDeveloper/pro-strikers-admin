/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import FacilityReservationForm from "../form/FacilityReservationForm";
import { useCreateFacilityReservationMutation } from "../../../redux/features/reservation/facilityReservation";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetfacilityMutation } from "../../../redux/features/schedule/facilityScheduleApi";
import { useGetSportAddonsQuery } from "../../../redux/features/addon/addonApi";

const AddFacilityReservationModal = () => {
  const user = useSelector(selectCurrentUser);
  const [data, setData] = useState(null);
  const [selectSlots, setSelectSlots] = useState<any>([]);
  const [open, setModalOpen] = useState(false);
  const [facilityId, setFacilityId] = useState("");
  const [form] = useForm();
  const [checkForm] = useForm();
  const [lane, setLane] = useState<string | undefined>(undefined);
  const [addons, setAddons] = useState([]);
  const [
    getData,
    {
      data: facility,
      isSuccess: querySuccess,
      isLoading: queryLoading,
      isError: queryError,
      error: queryErrorDetails,
    },
  ] = useGetfacilityMutation();
  const { data: addonsData } = useGetSportAddonsQuery(
    {
      sport: facility?.results?.sport,
    },
    { skip: facility?.results?._id ? false : true }
  );
  useEffect(() => {
    if (facility?.results?._id) {
      setLane(facility?.results?.lanes[0]);
    }
  }, [facility]);
  const [
    create,
    { data: createData, isLoading, isSuccess: createSuccess, isError, error },
  ] = useCreateFacilityReservationMutation();
  const onFinish = (values: any) => {
    values.facility = facilityId;
    const bookings: any = [];
    selectSlots?.forEach((dateSlots: any) =>
      dateSlots.slots.forEach((slot: string) =>
        bookings.push({
          date: dateSlots.date.toISOString().split("T")[0],
          time_slot: slot,
          training: facilityId,
        })
      )
    );
    values.bookings = bookings;
    values.addons = addons;
    create({ id: user?._id, payload: values });
  };
  const onCheckFinish = (values: any) => {
    setFacilityId(values.id);
    getData(values.id);
  };
  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${createData?.message}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setSelectSlots([]);
      setData(null);
      form.resetFields();
      checkForm.resetFields();
      setModalOpen(false);
    }
    if (querySuccess) {
      setData(facility);
      form.setFieldsValue({
        sport: facility?.results.sport,
      });
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
    if (queryError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(queryErrorDetails as any)?.data?.message}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [isError, createSuccess, queryError, querySuccess]);

  const onCancle = () => {
    form.resetFields();
    checkForm.resetFields();
    setSelectSlots([]);
    setData(null);
    setModalOpen(false);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Reservation
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Facility Reservation"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <div className="my-5">
          <FacilityReservationForm
            form={form}
            onFinish={onFinish}
            loading={isLoading || queryLoading}
            selectSlots={selectSlots}
            setSelectSlots={setSelectSlots}
            data={data}
            facilityId={facilityId}
            onCheckFinish={onCheckFinish}
            checkForm={checkForm}
            lane={lane}
            setLane={setLane}
            addons={addons}
            setAddons={setAddons}
            addonsData={addonsData}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddFacilityReservationModal;
