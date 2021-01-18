import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useLocalContect } from "../../context/context";
import MenuItem from "./MenuItem";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../lib/firebase";

const Compose = () => {
  const {
    setComposeOpen,
    setSnackbarOpen,
    setSnackbarMsg,
    currentUser,
    category,
  } = useLocalContect();
  const [recipents, setRecipents] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const createMailId = () => {
    setId(uuidv4());
  };

  const sendMail = () => {
    setComposeOpen(false);
    createMailId();
    setSnackbarOpen(true);
    setSnackbarMsg("Sending Mail...");

    db.collection("SentMails")
      .doc(currentUser.email)
      .collection("mails")
      .doc(id)
      .set({
        id: id,
        category: category,
        recipents: recipents,
        subject: subject,
        body: body,
        sender: currentUser.email,
        read: true,
        senderName: currentUser.displayName,
      })
      .then(() => {
        addRecivedMail();
      })
      .catch((err) => console.log(err));
  };

  const addRecivedMail = () => {
    db.collection("RecivedMails")
      .doc(recipents)
      .collection("mail")
      .doc(id)
      .set({
        id: id,
        category: category,
        recipents: recipents,
        subject: subject,
        body: body,
        sender: currentUser.email,
        senderName: currentUser.displayName,
        read: false,
      })
      .then(() => {
        setSnackbarMsg("Mail sent");
      });
  };
  return (
    <div className="compose">
      <div className="compose__container">
        <div className="compose__header">
          <h4>New Message</h4>
          <Close
            onClick={() => setComposeOpen(false)}
            className="compose__icon"
          />
        </div>
        <input
          className="compose__input"
          placeholder="Recipents"
          value={recipents}
          onChange={(e) => setRecipents(e.target.value)}
        />
        <input
          className="compose__input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="compose__textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="compose__footer">
          <div className="compose__footer__container">
            <Button
              className="compose__btn"
              color="primary"
              variant="contained"
              onClick={sendMail}
            >
              Send
            </Button>
            <MenuItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
