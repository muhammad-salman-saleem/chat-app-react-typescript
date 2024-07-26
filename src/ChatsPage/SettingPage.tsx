import { useContext, useState } from "react";

import axios from "axios";

import { useIsMobile } from "../functions/isMobile";
import { Context } from "../functions/context";
import { privateKey } from "../functions/constants";

import toast, { Toaster } from "react-hot-toast";
import PhotoInput from "../AuthPage/components/PhotoInput";
import Button from "../AuthPage/components/Button";
import Loader from "../AuthPage/components/Loader";
const SettingPage = () => {
  const { setUser } = useContext(Context);
  const userData: any = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [userName, setUserName] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarUrl] = useState<any>(user?.avatar);
  const [loading, setLoading] = useState<boolean>(false);
  // Hooks
  const isMobile: boolean = useIsMobile();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be the same");
      setLoading(false);
      return;
    }
    let formData = new FormData();
    if (userName) {
      formData.append("username", userName);
    }
    if (firstName) {
      formData.append("first_name", firstName);
    }
    if (lastName) {
      formData.append("last_name", lastName);
    }
    if (password && confirmPassword) {
      formData.append("secret", password);
      formData.append("confirm_secret", confirmPassword);
    }
    if (avatar) {
      formData.append("avatar", avatar, avatar.name);
    }

    const headers = { "Private-Key": privateKey };

    axios
      .patch(`https://api.chatengine.io/users/${user.id}`, formData, {
        headers,
      })
      .then((r) => {
        if (r.data) {
          const user: any = {
            first_name: r.data.first_name,
            last_name: r.data.last_name,
            email: r.data.email,
            username: r.data.username,
            secret: r.data.secret,
            avatar: r.data.avatar,
            custom_json: {},
            is_online: true,
          };
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userData", JSON.stringify(r.data));
          toast.success("User has been updated successfully");
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log("Error", e);
        toast.error("User not updated ");
        setLoading(false);
      });
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={onSubmit} autoComplete="off">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            marginLeft: "50px",
            gap: "20px",
          }}
        >
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="user name"
            id="user_name"
            className="ce-custom-setting-input"
            autoComplete="off"
            style={{
              width: isMobile ? "100%" : "calc(50% - 6px)",
              float: "right",
            }}
          />
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="first name"
            id="first_name"
            className="ce-custom-setting-input"
            autoComplete="off"
            style={{
              width: isMobile ? "100%" : "calc(50% - 6px)",
              float: "right",
            }}
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="last name"
            id="last_name"
            className="ce-custom-setting-input"
            autoComplete="off"
            style={{
              width: isMobile ? "100%" : "calc(50% - 6px)",
              float: "right",
            }}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            id="update_password"
            placeholder="password"
            type="password"
            className="ce-custom-setting-input"
            autoComplete="off"
            style={{
              width: isMobile ? "100%" : "calc(50% - 6px)",
              float: "right",
            }}
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            name="password"
            placeholder="confirm password"
            id="confirm_password"
            type="password"
            autoComplete="off"
            className="ce-custom-setting-input"
            style={{
              width: isMobile ? "100%" : "calc(50% - 6px)",
              float: "right",
            }}
          />

          <PhotoInput
            label="Profile picture"
            name="avatar"
            id="avatar-picker"
            style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
            onChange={(e) => {
              if (e.target.files !== null) {
                setAvatar(e.target.files[0]);
              }
            }}
            avatar={avatarUrl}
          />

          <Button
            type="submit"
            style={{
              width: isMobile ? "100%" : "calc(25% - 6px)",
              float: "right",
              display:"flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading?<Loader/>:"Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingPage;
