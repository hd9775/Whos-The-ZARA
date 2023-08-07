import { JOB_MAP } from "../../constants/common/JobMap";
import { GameCamListItem } from "./GameCamListItem";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
}

export const GameCamList = ({ mainStreamManager, subscribers }: UserVideoProps) => {
  const userList = [
    {
      roomCode: 24,
      userNo: 101,
      nickname: "jetty",
      orderNo: 1,
      jobNo: JOB_MAP[0].id,
      jobName: JOB_MAP[0].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 12,
      nickname: "cola",
      orderNo: 2,
      jobNo: JOB_MAP[1].id,
      jobName: JOB_MAP[1].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 32,
      nickname: "duri",
      orderNo: 3,
      jobNo: JOB_MAP[2].id,
      jobName: JOB_MAP[2].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 40,
      nickname: "koko",
      orderNo: 4,
      jobNo: JOB_MAP[3].id,
      jobName: JOB_MAP[3].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 112,
      nickname: "bibi",
      orderNo: 5,
      jobNo: JOB_MAP[4].id,
      jobName: JOB_MAP[4].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 11,
      nickname: "mong",
      orderNo: 6,
      jobNo: JOB_MAP[5].id,
      jobName: JOB_MAP[5].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 67,
      nickname: "maru",
      orderNo: 7,
      jobNo: JOB_MAP[6].id,
      jobName: JOB_MAP[6].name,
      isDie: false,
    },
    {
      roomCode: 24,
      userNo: 21,
      nickname: "hodu",
      orderNo: 8,
      jobNo: JOB_MAP[6].id,
      jobName: JOB_MAP[6].name,
      isDie: false,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem item={userList[0]} streamManager={mainStreamManager} />
          <GameCamListItem item={userList[1]} streamManager={subscribers[0]} />
        </div>
        <div className="flex">
          <GameCamListItem item={userList[2]} streamManager={subscribers[1]} />
          <GameCamListItem item={userList[3]} streamManager={subscribers[2]} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem item={userList[4]} streamManager={subscribers[3]} />
          <GameCamListItem item={userList[5]} streamManager={subscribers[4]} />
        </div>
        <div className="flex">
          <GameCamListItem item={userList[6]} streamManager={subscribers[5]} />
          <GameCamListItem item={userList[7]} streamManager={subscribers[6]} />
        </div>
      </div>
    </div>
  );
};
