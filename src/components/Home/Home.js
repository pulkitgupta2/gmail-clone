import React from "react";
import "./styles.css";
import { Header, Sidebar, Compose, Main, ViewMail } from "..";
import { useLocalContect } from "../../context/context";
import SimpleSnackbar from "../Snackbar/Snackbar";

const Home = ({ showMails = true, mailData }) => {
  const { composeOpen } = useLocalContect();
  return (
    <div className="home">
      {composeOpen && <Compose />}
      <Header />
      <Sidebar>
        {showMails ? <Main /> : <ViewMail mailData={mailData} />}
      </Sidebar>
      <SimpleSnackbar />
    </div>
  );
};

export default Home;
