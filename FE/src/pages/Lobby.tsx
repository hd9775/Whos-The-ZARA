import LobbyLayout from "../layouts/LobbyLayout";
import LobbySideMenu from "../components/lobby/LobbySideMenu";
import { LobbyCreateRoom } from "../components/lobby/LobbyCreateRoom";
import { LobbyHeaderBtn } from "../components/lobby/LobbyHeaderBtn";
import { LobbyRoomList } from "../components/lobby/LobbyRoomList";
import { useState } from "react";
import { LOOBY_COMPONENT_MAP } from "../constants/lobby/LoobyComponentMap";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useAccessTokenState } from "../context/accessTokenContext";
import { setAccessTokenLocalVar } from "../api/axios/interceptAxios";
import { useEffect } from "react";

const Lobby = () => {
  const accessToken = useFetchAccessToken();
  const { setAccessToken } = useAccessTokenState();

  useEffect(() => {
    setAccessToken(accessToken);
    setAccessTokenLocalVar(accessToken);
  }, []);

  const [viewMain, setViewMain] = useState(0);
  const onSetViewMain = (index: number) => {
    if (viewMain === index) {
      setViewMain(0);
    } else {
      setViewMain(index);
    }
  };
  return (
    <LobbyLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end 3xl:mt-[40px] mt-[30px] 3xl:mb-[20px] mb-[15px] 3xl:mr-[60px] mr-[48px]">
          <LobbyHeaderBtn text="프로필" loc="profile" />
          <LobbyHeaderBtn text="홈 화면" loc="" />
        </div>
        <div className="relative flex items-center 3xl:ml-[120px] ml-[102px]">
          <LobbySideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
          <div
            className={`3xl:min-w-[1140px] min-w-[912px] 3xl:h-[700px] h-[560px] 3xl:mx-[140px] mx-[112px] ${
              viewMain === LOOBY_COMPONENT_MAP.NONE
                ? ""
                : "border-solid border-white 3xl:border-[20px] border-[15px] 3xl:text-[56px] text-[44px] font-bold bg-black"
            }`}
          >
            {viewMain == LOOBY_COMPONENT_MAP.CREATE_ROOM && <LobbyCreateRoom />}
            {viewMain == LOOBY_COMPONENT_MAP.ROOM_LIST && <LobbyRoomList />}
          </div>
        </div>
      </div>
    </LobbyLayout>
  );
};

export default Lobby;
