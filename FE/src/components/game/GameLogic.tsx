import { GameCamList } from "./GameCamList";
// import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
// import { GameVote } from "./GameVote";
import { GameRabbit } from "./GameRabbit";
import { useWebSocket } from "../../context/socketContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SubChat,
  SubStartTimer,
  SubVote,
  SubVoteResult,
  SubNightResult,
  SubGameResult,
  SubStart,
  SubZaraChat,
  SubGhostChat,
  SubZaraTarget,
} from "../../types/StompGameSubType";
import { useAccessTokenState } from "../../context/accessTokenContext";
// import { GameNight } from "./GameNight";
import { useLocation } from "react-router-dom";
import { ChatList } from "../../types/GameLogicType";
import { GameVote } from "./GameVote";
import { GameNight } from "./GameNight";
import { GameAlert } from "../modal/GameAlert";

interface GameLogicProps {
  mainStreamManager?: any;
  subscribers: any[];
  infoOn: boolean;
  onSetInfoOn: () => void;
  setMyCamera: (cameraOn: boolean) => void;
  setMyMic: (micOn: boolean) => void;
  setAllAudio: (soundOn: boolean) => void;
  openViduSettingOnDayTime: (amIDead: boolean) => void;
  openViduSettingOnNight: (amIDead: boolean, amIZara: boolean) => void;
  openViduSettingOnVoteResult: (amIVoted: boolean) => void;
}

export const GameLogic = ({
  infoOn,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  setMyCamera,
  setMyMic,
  setAllAudio,
  openViduSettingOnDayTime,
  openViduSettingOnNight,
  openViduSettingOnVoteResult,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { gameCode } = useParams();
  const [ghostChatList, setGhostChatList] = useState<ChatList>([]);
  const [zaraChatList, setZaraChatList] = useState<ChatList>([]);
  const [allChatList, setAllChatList] = useState<ChatList>([]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState([
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
  ]);
  const [deathByVoteOrderNo, setDeathByVoteOrderNo] = useState<number | null>(null);
  const [deathByZaraOrderNo, setDeathByZaraOrderNo] = useState<number | null>(null);
  const [myJobSeq, setMyJobSeq] = useState(0);
  const [gameResult, setGameResult] = useState({});
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [zaraList, setZaraList] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [loading, setLoading] = useState(true);
  const [amIDead, setAmIDead] = useState(false);
  const [amIZara, setAmIZara] = useState(false);
  const [ghostList, setGhostList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [nowTime, setNowTime] = useState("");
  const [zaraTarget, setZaraTarget] = useState(0);

  console.log(
    ghostChatList,
    zaraChatList,
    allChatList,
    voteList,
    deathByZaraOrderNo,
    gameResult,
    location,
    zaraList,
    setAmIDead,
    openViduSettingOnDayTime,
    openViduSettingOnNight
  );

  // const userSeqOrderMap: { [userSeq: number]: number } = location.state.userSeqOrderMap;
  const userSeqOrderMap: { [userSeq: number]: number } = {
    4: 0,
    7: 1,
    8: 2,
    5: 3,
    2: 4,
    1: 5,
    6: 6,
    3: 7,
    0: 8,
    // userSeq를 userOrder로 매핑
  };
  const myOrderNo = userSeqOrderMap[userSeq];

  useEffect(() => {
    if (myJobSeq > 0) {
      setLoading(false);
    }
  }, [myJobSeq]);

  useEffect(() => {
    const userJobZara = userInfo.filter((user) => {
      return user.jobSeq === 2;
    });
    setZaraList(userJobZara);
  }, [userInfo]);

  const subGame = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/all`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "GAME_START":
          const startData: SubStart = subDataBody;
          console.log(startData);
          const initMyJobSeq = startData.data.find((user) => {
            return user.userSeq === userSeq;
          })?.jobSeq;
          const sortUserData = startData.data.sort((a, b) => {
            const orderA = userSeqOrderMap[a.userSeq];
            const orderB = userSeqOrderMap[b.userSeq];
            return orderA - orderB; // userOrder 기준으로 정렬
          });
          console.log(sortUserData);
          setAmIZara(sortUserData[myOrderNo].jobSeq === 2 ? true : false);
          setMyJobSeq(initMyJobSeq!);
          setUserInfo(sortUserData);
          break;

        case "CHAT_ALL":
          const chatData: SubChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[chatData.data.sender],
            nickname: chatData.data.nickname,
            message: chatData.data.message,
          };
          setAllChatList((prev) => [...prev, myChatData]);
          break;

        case "GAME_TIMER":
          const timerData: SubStartTimer = subDataBody;
          setTimer(timerData.data.time);
          setNowTime(timerData.data.type);
          break;

        case "GAME_TIMER_DECREASE":
          // const timerData: SubStartTimer = subDataBody;
          // setTimer(timerData.data.time);
          // setNowTime(timerData.data.type);
          break;

        case "GAME_VOTE":
          const voteData: SubVote = subDataBody;
          const sortVoteData = voteData.data.sort((a, b) => {
            const orderA = userSeqOrderMap[a.userSeq];
            const orderB = userSeqOrderMap[b.userSeq];
            return orderA - orderB; // userOrder 기준으로 정렬
          });
          setVoteList(sortVoteData);
          break;

        case "GAME_VOTE_RESULT":
          const voteResultData: SubVoteResult = subDataBody;
          const votedUserSeq = voteResultData.data;
          const votedUserOrderNo = userSeqOrderMap[votedUserSeq];
          openViduSettingOnVoteResult(votedUserOrderNo === myOrderNo);
          setDeathByVoteOrderNo(votedUserOrderNo);
          break;

        case "GAME_NIGHT_RESULT":
          const aliveData: SubNightResult = subDataBody;
          setDeathByZaraOrderNo(aliveData.userSeq);
          break;

        case "GAME_RESULT":
          const gameResultData: SubGameResult = subDataBody;
          setGameResult(gameResultData.data);
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGame = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/all`);
  };

  const subGameZara = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/zara`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME ZARA");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_ZARA":
          const subChatData: SubZaraChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subChatData.data.sender],
            nickname: subChatData.data.nickname,
            message: subChatData.data.message,
          };
          setZaraChatList((prev) => [...prev, myChatData]);
          break;
        case "ABILITY":
          const subZaraTargetData: SubZaraTarget = subDataBody;
          const zaraTargetData = {
            targetOrderNo: userSeqOrderMap[subZaraTargetData.data.targetUserSeq],
          };
          setZaraTarget(zaraTargetData.targetOrderNo);
          break;
        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameZara = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/zara`);
  };

  const subGameGhost = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/ghost`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME GHOST");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_GHOST":
          const subDeadData: SubGhostChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subDeadData.data.sender],
            nickname: subDeadData.data.nickname,
            message: subDeadData.data.message,
          };
          setGhostChatList((prev) => [...prev, myChatData]);
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameGhost = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/ghost`);
  };

  useEffect(() => {
    if (amIZara) subGameZara(gameCode!);

    return () => {
      unSubGameZara(gameCode!);
    };
  }, [amIZara]);

  useEffect(() => {
    subGame(gameCode!);

    return () => {
      unSubGame(gameCode!);
    };
  }, [gameCode]);

  useEffect(() => {
    if (amIDead) subGameGhost(gameCode!);

    return () => {
      unSubGameGhost(gameCode!);
    };
  }, [amIDead]);

  useEffect(() => {
    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByVoteOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);
  }, [deathByVoteOrderNo]);

  return (
    <>
      <GameMyJob myJobSeq={1} />
      {!loading && (
        <>
          <GameCamList
            mainStreamManager={mainStreamManager}
            subscribers={subscribers}
            myOrderNo={myOrderNo}
            userInfo={userInfo}
            ghostList={ghostList}
          />
          <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
          <GameMyJob myJobSeq={myJobSeq} />
          {nowTime === "VOTE" && (
            <GameVote voteList={voteList} ghostList={ghostList} userSeqOrderMap={userSeqOrderMap} />
          )}
          {nowTime === "NIGHT" && (
            <GameNight
              ghostList={ghostList}
              userInfo={userInfo}
              amIZara={amIZara}
              myOrderNo={myOrderNo}
              zaraTarget={zaraTarget}
            />
          )}
          <GameMenu onSetInfoOn={onSetInfoOn} setMyCamera={setMyCamera} setMyMic={setMyMic} setAllAudio={setAllAudio} />
          {/* <GameChat
            allChatList={allChatList}
            zaraChatList={zaraChatList}
            ghostChatList={ghostChatList}
            myJobSeq={myJobSeq}
            amIDead={amIDead}
            amIZara={amIZara}
          /> */}
          <GameRabbit
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            setDeathByVoteOrderNo={setDeathByVoteOrderNo}
            deathByVoteOrderNo={deathByVoteOrderNo}
          />
          <GameTimer timer={timer} setTimer={setTimer} />
          <GameAlert type={0} />
        </>
      )}
    </>
  );
};
