import { useEffect, useState } from "react";
import { reissueAccessToken } from "../api/axios/usersApiCall";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useFetchAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const newAccessToken = await reissueAccessToken();
        setAccessToken(newAccessToken);
      } catch (error: unknown) {
        console.log(error);
        const axiosError = error as AxiosError;
        const { data, status } = axiosError.response!;
        const { message } = data as { message: string };
        if (status === 400) return;
        if (message === "Invalid Token") {
          toast.error("다시 로그인 해주세요.");
          navigate("/");
        }
      }
    })();
  }, []);

  return accessToken;
};