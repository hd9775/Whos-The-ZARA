import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import HomeSideMenu from "../components/home/HomeSideMenu";
import { Modal_Category_Map } from "../constants/home/ModalCategoryMap";
import LoginFormModal from "../components/modal/LoginFormModal";
import SignupFormModal from "../components/modal/SignupFormModal";
import ResetPwFormModal from "../components/modal/ResetPwFormModal";
import GameDescriptionModal from "../components/modal/GameDescriptionModal";

const Home = () => {
  const [curModalType, setCurModalType] = React.useState<number>(Modal_Category_Map.NONE);

  const showModalHandler = (ShowModalType: number) => {
    setCurModalType(ShowModalType);
  };

  return (
    <HomeLayout>
      <HomeSideMenu showModalHandler={showModalHandler} />
      <LoginFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <SignupFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <ResetPwFormModal curModalType={curModalType} showModalHandler={showModalHandler} />
      <GameDescriptionModal curModalType={curModalType} showModalHandler={showModalHandler} />
    </HomeLayout>
  );
};

export default Home;
