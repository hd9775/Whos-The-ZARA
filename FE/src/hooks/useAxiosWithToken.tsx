import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ERROR_CODE_MAP } from "../constants/error/ErrorCodeMap";
import { useAxiosIntercept } from "./useAxiosIntercept";
import usersUrl from "../api/url/usersUrl";
import roomUrl from "../api/url/roomUrl";
import { JobSettingContextType } from "../context/roomSettingContext";

export const useAxiosWithToken = () => {
  const interceptAxiosInstance = useAxiosIntercept();

  const changePassword = async (password: string, newPassword: string) => {
    const url = usersUrl.changePw();
    const payload = { password, newPassword };
    try {
      await toast.promise(interceptAxiosInstance.patch(url, payload), {
        pending: "비밀번호를 변경중입니다.",
        success: "비밀번호가 변경되었습니다.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        case ERROR_CODE_MAP.IN_VALID_INPUT:
          toast.error("비밀번호 형식이 올바르지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const deleteUser = async (password: string) => {
    const url = usersUrl.delUser();
    const payload = { password };
    try {
      await toast.promise(interceptAxiosInstance.delete(url, { data: payload }), {
        pending: "회원탈퇴 중입니다.",
        success: "회원탈퇴 되었습니다.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;

        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const getMyInfo = async () => {
    const url = usersUrl.getMyInfo();
    try {
      const res = await interceptAxiosInstance.get(url);
      const myInfo = JSON.parse(res.request.response);
      return myInfo;
    } catch (error: unknown) {
      //TODO: 에러처리
      throw error;
    }
  };

  const createRoom = async (title: string, jobSetting: JobSettingContextType) => {
    const url = roomUrl.baseRoomUrl();
    const payload = { title, jobSetting };
    try {
      const res = await interceptAxiosInstance.post(url, payload);
      console.log(res);
      const roomCode = JSON.parse(res.request.response);
      return roomCode;
    } catch (error) {
      //TODO: 에러처리
      throw error;
    }
  };

  return {
    changePassword,
    deleteUser,
    getMyInfo,
    createRoom,
  };
};