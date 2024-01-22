"use client";

import axios from "axios";
import { useState } from "react";
import HeadingText from "@/components/heading-text";
import ProjectCreateForm from "@/components/pages/create-project-form";

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-10text-gray-200 inline w-10 animate-spin fill-blue-600 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#e7e7e7"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#e33e33"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

function getCode() {
  const currentUrl = window.location.href;

  // Create a URLSearchParams object
  const searchParams = new URLSearchParams(new URL(currentUrl).search);

  // Get the value of the 'code' query parameter
  const code = searchParams.get("code");

  return code;
}

async function refresh(accessToken: string, refreshToken: string) {
  const { data } = await axios.post(
    `https://api.furo.one/sessions/token/refresh`,
    {
      accessToken,
    },
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    }
  );

  const { access_token, refresh_token } = data;
  localStorage.setItem(`access-token`, access_token);
  localStorage.setItem(`refresh-refresh`, refresh_token);
  return { access_token };
}

async function getAccessToken() {
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");

  if (accessToken && refreshToken) {
    const payloadBase64 = accessToken.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    if (!exp) return accessToken;
    const expired = Date.now() >= exp * 1000;
    if (!expired) return accessToken;
    else {
      const { access_token: token } = await refresh(accessToken, refreshToken);
      return token;
    }
  }

  return null;
}

function loginWithRedirect() {
  window.location.href =
    "https://auth.furo.one/login/a5111263d5b4f90f9a9e1ed0ece3b00a";
}

function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  if (typeof window === "undefined") {
    return {
      loading,
      user,
    };
  }

  // check localstorage for token
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");

  const code = getCode();

  if (!user) {
    // if token exists, return true
    if (accessToken && refreshToken) {
      getAccessToken()
        .then((token) => {
          if (!token) throw new Error("no access token");
          return axios.get("https://api.furo.one/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          //remove localstorage
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          loginWithRedirect();
        });
      // if query code= exist, use it
    } else if (code) {
      axios
        .post("https://api.furo.one/sessions/code/authenticate", {
          code,
        })
        .then((res) => {
          localStorage.setItem("access-token", res.data.access_token);
          localStorage.setItem("refresh-token", res.data.refresh_token);
          return res.data.access_token;
        })
        .then((token) => {
          return axios.get("https://api.furo.one/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          loginWithRedirect();
        });
    } else {
      loginWithRedirect();
    }
  }

  return {
    loading,
    user,
    getAccessToken,
  };
}

function getNameByEmail(email: string) {
  const name = email.split("@")[0];
  return name;
}

export default function Dashboard() {
  const [requested, setRequested] = useState<boolean>(false);
  const formSent = () => setRequested(true);

  const { loading, user, getAccessToken } = useAuth();

  if (loading || !user) {
    return (
      <main
        className="container flex flex-col items-center gap-12 py-8"
        id="contact"
      >
        <Spinner />
      </main>
    );
  }

  return (
    <main
      className="container flex flex-col items-center gap-12 py-8"
      id="contact"
    >
      <div
        style={{
          width: "100%",
        }}
        className="flex flex-col space-y-2"
      >
        <HeadingText subtext="Initialize your first project">{`Welcome! ${getNameByEmail(
          user.email
        )}`}</HeadingText>
      </div>
      {!requested ? (
        <ProjectCreateForm email={user.email} callback={formSent} />
      ) : (
        <div
          className="p-16 text-xl font-semibold"
          style={{
            whiteSpace: "pre",
          }}
        >{`Thank you!\n\nWe are currently operating our service in beta. \nYour project request has been sent, and we will notify you once it has been approved.`}</div>
      )}
    </main>
  );
}
