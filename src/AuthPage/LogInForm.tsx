import { useState, useContext } from "react";

import axios from "axios";

import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Link from "./components/Link";

import { Context } from "../functions/context";
import { projectId } from "../functions/constants";
import { PersonObject } from "react-chat-engine-advanced";
import toast, { Toaster } from "react-hot-toast";

interface LogInFormProps {
  onHasNoAccount: () => void;
}

const LogInForm = (props: LogInFormProps) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const { setUser } = useContext(Context);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const headers = {
      "Project-ID": projectId,
      "User-Name": email,
      "User-Secret": password,
    };

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers,
      })
      .then((r) => {
        if (r.status === 200) {
          const user: PersonObject = {
            first_name: r.data.first_name,
            last_name: r.data.last_name,
            email: email,
            username: email,
            secret: password,
            avatar: r.data.avatar,
            custom_json: {},
            is_online: true,
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userData', JSON.stringify(r.data));
          toast.success("User login successfully")
        }
      })
      .catch((e) => {
        console.log("Error", e)
        toast.error(e.response.data.detail)
      });
  };

  return (
    <div>
       <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="form-title">Welcome Back</div>

      <div className="form-subtitle">
        New here? <Link onClick={() => props.onHasNoAccount()}>Sign Up</Link>
      </div>

      <form onSubmit={onSubmit}>
        <TextInput
          label="Email"
          name="email"
          placeholder="adam@lamorre.co"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
};

export default LogInForm;
