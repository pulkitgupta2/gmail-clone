import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { useLocalContect } from "./context";

const MailContext = createContext();

export function useMailContext() {
  return useContext(MailContext);
}

export function MailContextProvider({ children }) {
  const [receivedMails, setReceivedMails] = useState([]);
  const [onScreenMails, setOnScreenMails] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const [mailsType, setMailsType] = useState("Primary");
  const [socialUnreadNo, setSocialUnreadNo] = useState(0);
  const [primaryUnreadNo, setPrimaryUnreadNo] = useState(0);
  const [inboxUnreadNo, setInboxUnreadNo] = useState(0);
  const [promosUnreadNo, setPromosUnreadNo] = useState(0);
  const [updatesUnreadNo, setUpdatesUnreadNo] = useState(0);

  const { currentUser } = useLocalContect();

  useEffect(() => {
    if (currentUser) {
      db.collection("RecivedMails")
        .doc(currentUser.email)
        .collection("mail")
        .onSnapshot((snapshot) => {
          setReceivedMails(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      db.collection("SentMails")
        .doc(currentUser.email)
        .collection("mails")
        .onSnapshot((snapshot) => {
          setSentMails(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (mailsType === "Primary") {
      let array = receivedMails.filter((e) => {
        return e.category === "Primary";
      });
      setOnScreenMails(array);
    }

    if (mailsType === "Sent") {
      setOnScreenMails(sentMails);
    }

    if (mailsType === "Promotions") {
      let array = receivedMails.filter((e) => {
        return e.category === "Promotions";
      });
      setOnScreenMails(array);
    }
    if (mailsType === "Social") {
      let array = receivedMails.filter((e) => {
        return e.category === "Social";
      });
      setOnScreenMails(array);
    }
    if (mailsType === "Updates") {
      let array = receivedMails.filter((e) => {
        return e.category === "Updates";
      });
      setOnScreenMails(array);
    }
  }, [mailsType, receivedMails, sentMails]);

  useEffect(() => {
    let array = receivedMails.filter((e) => {
      return e.read === false;
    });

    let primaryUnread = array.filter((e) => {
      return e.category === "Primary";
    });

    primaryUnread.map((value, index) => {
      let a1 = 1 + index;
      setPrimaryUnreadNo(a1);

      return a1;
    });
  }, [receivedMails]);

  useEffect(() => {
    let array = receivedMails.filter((e) => {
      return e.read === false;
    });

    array.map((value, index) => {
      let a1 = 1 + index;
      setInboxUnreadNo(a1);

      return a1;
    });
  }, [receivedMails]);

  useEffect(() => {
    let array = receivedMails.filter((e) => {
      return e.read === false;
    });

    let primaryUnread = array.filter((e) => {
      return e.category === "Social";
    });

    primaryUnread.map((value, index) => {
      let a1 = 1 + index;
      setSocialUnreadNo(a1);

      return a1;
    });
  }, [receivedMails]);

  useEffect(() => {
    let array = receivedMails.filter((e) => {
      return e.read === false;
    });

    let primaryUnread = array.filter((e) => {
      return e.category === "Promotions";
    });

    primaryUnread.map((value, index) => {
      let a1 = 1 + index;
      setPromosUnreadNo(a1);

      return a1;
    });
  }, [receivedMails]);

  useEffect(() => {
    let array = receivedMails.filter((e) => {
      return e.read === false;
    });

    let primaryUnread = array.filter((e) => {
      return e.category === "Updates";
    });

    primaryUnread.map((value, index) => {
      let a1 = 1 + index;
      setUpdatesUnreadNo(a1);

      return a1;
    });
  }, [receivedMails]);

  const value = {
    onScreenMails,
    setMailsType,
    mailsType,
    socialUnreadNo,
    primaryUnreadNo,
    inboxUnreadNo,
    promosUnreadNo,
    updatesUnreadNo,
  };
  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}
