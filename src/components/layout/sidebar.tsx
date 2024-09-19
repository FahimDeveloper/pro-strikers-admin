import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../router/admin.routes";
import { superAdminPaths } from "../../router/super-admin.routes";
import { navigationGenerator } from "../../utils/navigationGenerator";
import { Menu } from "antd";
import logo from "../../assets/icon/logo.svg";
import { useAppSelector } from "../../hooks/useAppHooks";
import { trainerPaths } from "../../router/trainer.routes";
import { userRole } from "../../utils/role";

const Sidebar = ({ locationKey }: { locationKey: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  let sidebarItems;
  switch (user?.role) {
    case userRole.SUPER_ADMIN:
      sidebarItems = navigationGenerator(superAdminPaths, userRole.SUPER_ADMIN);
      break;
    case userRole.ADMIN:
      sidebarItems = navigationGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.TRAINER:
      sidebarItems = navigationGenerator(trainerPaths, userRole.TRAINER);
      break;
    default:
      break;
  }
  return (
    <Sider
      theme="light"
      width={260}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="mt-3 pb-5 space-y-2">
        <div className="ms-5">
          <img src={logo} className="w-36 object-cover" alt="logo" />
        </div>
        <Menu
          className="font-bold text-base"
          theme="light"
          mode="inline"
          items={sidebarItems}
          defaultSelectedKeys={[locationKey]}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
