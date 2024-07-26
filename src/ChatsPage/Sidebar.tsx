import { useContext } from "react";

import {
  LogoutOutlined,
  HomeFilled,
  MessageFilled,
  SettingFilled,
} from "@ant-design/icons";

import { Avatar } from "react-chat-engine-advanced";

import { Context } from "../functions/context";

interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, setUser } = useContext(Context);

  const logoutUser=()=>{
    localStorage.removeItem("user");
    setUser(undefined);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="ce-sidebar-menu">
        <HomeFilled className={`ce-sidebar-icon ${activeTab === "Home" ? "ce-sidebar-icon-active" : ""}`} onClick={()=>setActiveTab("Home")}/>
        <MessageFilled className={`ce-sidebar-icon ${activeTab === "Message" ? "ce-sidebar-icon-active" : ""}`} onClick={()=>setActiveTab("Message")}/>
        <SettingFilled className={`ce-sidebar-icon ${activeTab === "Setting" ? "ce-sidebar-icon-active" : ""}`} onClick={()=>setActiveTab("Setting")}/>
      </div>

      <Avatar
        className="sidebar-avatar"
        avatarUrl={typeof user?.avatar === "string" ? user.avatar : undefined}
        username={user?.username}
        isOnline={true}
      />

      <LogoutOutlined
        onClick={() => logoutUser()}
        className="signout-icon"
      />
    </div>
  );
};

export default Sidebar;
