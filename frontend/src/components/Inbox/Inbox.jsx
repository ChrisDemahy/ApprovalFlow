import React, { useState } from 'react';
import RoundButton from '../../components/RoundButton/RoundButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import UnreadsContainer from './UnreadsContainer';
import MentionsContainer from './MentionsContainer';
import './Inbox.css';

const Inbox = () => {
  const [currentMenu, setCurrentMenu] = useState('unreads');

  const mention_button_classes =
    currentMenu === 'mentions'
      ? 'button inbox-button is-active'
      : 'button inbox-button';
  const unread_button_classes =
    currentMenu === 'unreads'
      ? 'button inbox-button is-active'
      : 'button inbox-button';

  return (
    <div className="inbox">
      <div className="box">
        <div className="container inbox-header">
          <div
            className={mention_button_classes}
            onClick={() => setCurrentMenu('mentions')}
          >
            Mentions
          </div>
          <div
            className={unread_button_classes}
            onClick={() => setCurrentMenu('unreads')}
          >
            Unreads
          </div>
          <div className="is-pulled-right">
            <RoundButton>
              <FontAwesomeIcon
                style={{ height: '20px', width: '20px' }}
                icon={faCheckDouble}
              />
            </RoundButton>
          </div>
        </div>
        <div className="container inbox-main">
          {currentMenu === 'unreads' ? (
            <UnreadsContainer />
          ) : (
            <MentionsContainer />
          )}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
