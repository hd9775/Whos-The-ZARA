import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";
import { ProfileHeaderBtn } from "../components/profile/ProfileHeaderBtn";
import { ProfileRecentlyData } from "../components/profile/ProfileRecentlyData";
import { ProfileData } from "../components/profile/ProfileData";
import ProfileDelUser from "./../components/profile/ProfileDelUser";
import { useEffect } from "react";

const Profile = () => {
  const [viewMain, setViewMain] = useState(0);
  useEffect(() => {}, []);

  // TODO: 추가적으로 최근전적 + 게임전적통계 가져오고 보여주기, 이부분은 api 아직 안만들어짐

  const onSetViewMain = (index: number) => {
    setViewMain((prevViewMain) => {
      if (prevViewMain === index) {
        return 0;
      } else {
        return index;
      }
    });
  };
  return (
    <ProfileLayout>
      <ProfileSideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
      {/*TODO: {viewMain == 0 ? <> : ""} */}
      {viewMain == 1 ? <ProfileUpdate /> : ""}
      {viewMain == 2 ? <ProfileRecentlyData /> : ""}
      {viewMain == 3 ? <ProfileData /> : ""}
      {viewMain == 4 ? <ProfileDelUser /> : ""}
      <ProfileHeaderBtn index={0} text="로비 화면" loc="lobby" />
      <ProfileHeaderBtn index={1} text="홈 화면" loc="" />
    </ProfileLayout>
  );
};

export default Profile;
