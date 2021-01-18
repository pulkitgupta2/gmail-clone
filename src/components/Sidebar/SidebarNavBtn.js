import { Badge } from "@material-ui/core";
import { Inbox, Keyboard, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useLocalContect } from "../../context/context";
import { useMailContext } from "../../context/MailCotext";

const SidebarNavBtn = () => {
  const { drawerOpen } = useLocalContect();
  const { setMailsType, inboxUnreadNo } = useMailContext();

  const [active, setActive] = useState("inbox");

  const updatePrimaryActive = () => {
    setMailsType("Primary");
    setActive("inbox");
  };

  const sentActive = () => {
    setMailsType("Sent");
    setActive("sent");
  };
  return (
    <div className="sidebar__btns">
      <div
        onClick={updatePrimaryActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        } ${active === "inbox" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Inbox className="sidebar__icon" />
              <p>Inbox</p>
            </>
          ) : (
            <Badge badgeContent={0} color="error">
              <Inbox className="sidebar__icon" />
            </Badge>
          )}
        </div>
        <div
          className={`sidebar__unread ${!drawerOpen && "sidebar__unreadClose"}
         
          `}
        >
          <p>{inboxUnreadNo}</p>
        </div>
      </div>

      <div
        onClick={sentActive}
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        }  ${active === "sent" && "sidebar__active"}`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Inbox className="sidebar__icon" />
              <p>Sent</p>
            </>
          ) : (
            <Badge badgeContent={0} color="error">
              <Inbox className="sidebar__icon" />
            </Badge>
          )}
        </div>
      </div>

      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
      <SideDummyButtons />
    </div>
  );
};

export default SidebarNavBtn;

const SideDummyButtons = () => {
  const { drawerOpen } = useLocalContect();

  return (
    <div
      className={`sidebar__btn sidebar__topBtn  ${
        !drawerOpen && "sidebar__btnClose"
      }`}
    >
      <div
        className={`sidebar__btnLeft ${!drawerOpen && "sidebar__btnLeftClose"}`}
      >
        {drawerOpen ? (
          <>
            <Inbox className="sidebar__icon" />
            <p>Inbox</p>
          </>
        ) : (
          <Badge badgeContent={0} color="error">
            <Inbox className="sidebar__icon" />
          </Badge>
        )}
      </div>
    </div>
  );
};

export function MeetBtns() {
  const { drawerOpen } = useLocalContect();
  return (
    <div className="navabr__meetOptions">
      <p className="navbar__meetTitle">Meet</p>
      <div
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        }`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Videocam className="sidebar__icon" />
              <p>New Meeting</p>
            </>
          ) : (
            <Videocam className="sidebar__icon" />
          )}
        </div>
      </div>

      <div
        className={`sidebar__btn sidebar__topBtn  ${
          !drawerOpen && "sidebar__btnClose"
        }`}
      >
        <div
          className={`sidebar__btnLeft ${
            !drawerOpen && "sidebar__btnLeftClose"
          }`}
        >
          {drawerOpen ? (
            <>
              <Keyboard className="sidebar__icon" />
              <p>Join a meeting</p>
            </>
          ) : (
            <Keyboard className="sidebar__icon" />
          )}
        </div>
      </div>
    </div>
  );
}
