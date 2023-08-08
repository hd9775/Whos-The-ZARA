import { JOB_MAP } from "../../constants/common/JobMap";
import roomTitle from "../../assets/img/room/roomTitle.png";
import RoomJobBtn from "./RoomJobBtn";
import { JOB_ID, JobSettingType } from "../../types/RoomSettingType";
import { useState } from "react";

interface RoomHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  jobSetting: JobSettingType;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSettingType>>;
}

export const RoomHeader = ({ title, setTitle, jobSetting, setJobSetting }: RoomHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  const onEditTitle = () => {
    setIsEditing(true);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const onCompleteEditTitle = () => {
    setTitle(inputTitle);
    setIsEditing(false);
  };

  return (
    <div
      className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center bg-cover 3xl:ml-[25px] ml-[20px]"
      style={{ backgroundImage: `url("${roomTitle}")` }}
    >
      {isEditing ? (
        <div className="flex items-center 3xl:w-[1000px] w-[800px]">
          <input
            className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10 text-black"
            value={inputTitle}
            onChange={onTitleChange}
          />
          <button className="3xl:text-[30px] text-[24px]" onClick={onCompleteEditTitle}>
            완료
          </button>
        </div>
      ) : (
        <div className="flex items-center 3xl:w-[1000px] w-[800px]">
          <p className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10">{title}</p>
          <button className="3xl:text-[30px] text-[24px]" onClick={onEditTitle}>
            제목 수정
          </button>
        </div>
      )}

      <div className="flex justify-end w-[272px] 3xl:w-[340px]">
        {JOB_MAP.map(
          (job) =>
            job.id > 2 && (
              <RoomJobBtn
                key={job.id}
                img={job.imgColor}
                id={job.id}
                isUsedInitial={jobSetting[job.id.toString() as JOB_ID]}
                setJobSetting={setJobSetting}
                jobSetting={jobSetting}
              />
            )
        )}
      </div>
    </div>
  );
};
