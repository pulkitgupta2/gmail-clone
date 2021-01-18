import { Avatar, Button, Checkbox } from "@material-ui/core";
import { MoreVert, Refresh } from "@material-ui/icons";
import React from "react";
import { useLocalContect } from "../../context/context";
import "./styles.css";

const ViewMail = ({ mailData }) => {
  const { drawerOpen } = useLocalContect();

  return (
    <div className={`main ${!drawerOpen && "main--fullWidth"}`}>
      <div className="main__controlBtns">
        <Checkbox color="secondary" className="main__check" />
        <Refresh />
        <MoreVert />
      </div>

      <div className="viewMail__body">
        <h1 className="viewMail__heading">{mailData.subject}</h1>
        <div className="viewMail__senderDetails">
          <Avatar />
          <div className="viewMail__sender">
            <div className="viewMail__senderWrapper">
              <h1 className="viewMail__senderName">{mailData.senderName}</h1>
              <p className="viewMail__senderMail">{`<${mailData.sender}>`}</p>
            </div>
            <p className="viewMail__info">to me</p>
          </div>
        </div>

        <div className="viewMail__bodyBtm">
          <p className="viewMail__bodyText">{mailData.body}</p>
          <Button variant="outlined" className="home__signOut">
            Reply
          </Button>

          <Button variant="outlined" className="home__signOut margin-left">
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewMail;
