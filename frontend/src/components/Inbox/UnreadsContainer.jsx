import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RoundButton from "../../components/RoundButton/RoundButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import Post from "../../components/Post";

const UnreadsContainer = () => {
    const currentUnreads = useSelector((state) => state.unreadState.unreads);
    const unreads = useSelector((state) => state.unreadState.unreads);

    const dispatch = useDispatch();
    return (
        <div>
            <div className="notification">
                <span className="columns">
                    <div className="column is-one-fifth">
                        <RoundButton>
                            <FontAwesomeIcon
                                style={{ height: "20px", width: "20px" }}
                                icon={faInbox}
                            />
                        </RoundButton>
                    </div>
                    <div className="column">
                        <div className="">
                            <strong>
                                Stay up to date with the latest messages!
                            </strong>
                            <br />
                            Unread messages from all your unmuted channels will
                            show up here. Time to get to that zero inbox!
                        </div>
                        <br />
                        <button className="button">Got it!</button>
                    </div>
                </span>
            </div>
            {unreads && unreads.map((unreadPost) => <Post post={unreadPost} />)}
        </div>
    );
};
export default UnreadsContainer;
