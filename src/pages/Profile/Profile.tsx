import { Button } from "antd";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
import moment from "moment";
import { useAppDispatch } from "../../hooks/useAppHooks";
import {
  loggedOutUser,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import ChangePasswordModal from "../../components/ui/modal/ChangePasswordModal";
import UpdateProfileModal from "../../components/ui/modal/UpdateProfileModal";
import { useAdminQuery } from "../../redux/features/admin/adminApi";
import { useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(loggedOutUser());
  };
  const user = useSelector(selectCurrentUser);
  const { data } = useAdminQuery(user?._id);
  const info = data?.results;
  const showConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ABAC3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };
  return (
    <div className="space-y-7">
      <div className="flex justify-between">
        <img className="size-40 rounded-full object-cover" src={info?.image} />
        <div className="flex gap-2">
          <UpdateProfileModal record={info} />
          <ChangePasswordModal />
          <Button onClick={showConfirm} className="flex gap-2 items-center">
            Logout
            <IoIosLogOut />
          </Button>
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-xl text-[#006166] font-medium">
            Personal Details
          </h3>
          <div className="flex gap-10 flex-wrap">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p className="text-lg text-black">
                {info?.first_name || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p className="text-lg text-black">
                {info?.last_name || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-lg text-black">
                {info?.gender || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-lg text-black">
                {info?.date_of_birth
                  ? moment(info?.date_of_birth).format("MMMM Do YYYY")
                  : "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Nationality</p>
              <p className="text-lg text-black">
                {info?.nationality || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl text-[#006166] font-medium">Address</h3>
          <div className="flex gap-10 flex-wrap">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Street Address
              </p>
              <p className="text-lg text-black">
                {info?.street_address || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="text-lg text-black">
                {info?.city || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">State</p>
              <p className="text-lg text-black">
                {info?.state || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Country</p>
              <p className="text-lg text-black">
                {info?.country || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl text-[#006166] font-medium">
            Contact Details
          </h3>
          <div className="flex gap-10 flex-wrap">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-lg text-black">
                {info?.phone || "Not Provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg text-black">
                {info?.email || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
