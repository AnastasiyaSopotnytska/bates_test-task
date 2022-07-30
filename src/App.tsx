/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import timezonesFromServer from './api/timezones.json';
import { Published } from './components/published/Published';
import { AddEvents } from './components/AddEvents/AddEvents';
import { Unpublished } from './components/Unpublished/Unpublished';
import { Event } from './react-app-env';

export const App: React.FC = () => {
  const [isActive, setIsActive] = useState<string>('published');
  const [addEvent, setAddEvents] = useState<boolean>(false);
  const [unpublishedEvents, setUnpublishedEvents] = useState<Event[]>([]);
  const [publishedEvents, setPublishedEvents] = useState<Event[]>([]);

  const [timezones, setTimezones] = useState<string>('America/New_York');

  useEffect(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    setUnpublishedEvents(unpublishedEvents.map(x => {
      x.time = `${dayjs.tz(x.currentTime).tz(timezones).hour()}:${dayjs.tz(x.currentTime).tz(timezones).minute()} - ${dayjs.tz(x.currentTime).tz(timezones).date()}.${new Date().getMonth()}.${dayjs.tz(x.currentTime).tz(timezones).year()}`;

      return x;
    }));

    setPublishedEvents(publishedEvents.map(x => {
      x.time = `${dayjs.tz(x.currentTime).tz(timezones).hour()}:${dayjs.tz(x.currentTime).tz(timezones).minute()} - ${dayjs.tz(x.currentTime).tz(timezones).date()}.${new Date().getMonth()}.${dayjs.tz(x.currentTime).tz(timezones).year()}`;

      return x;
    }));
  }, [timezones]);

  return (
    <>
      <div className="main">
        <div className="header">
          <h1 className="header_title">Event Manager</h1>
          <div className="header_timezone">
            <div className="header_timezone-logo"></div>
            <h2 className="header_timezone-title">Select Timezone</h2>
          </div>
          <div className="header_selected">
            <select
              name="timezone"
              id="timezone"
              className="header_select"
              onChange={(event) => setTimezones(event.target.value)}
            >
              {timezonesFromServer.map(zone => (
                <option key={zone.id} value={zone.value}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="events">
          <div className="events_tabs">
            <button
              type="button"
              onClick={() => setIsActive('published')}
              className={classNames('events_tabs-button', { 'button-active': isActive === 'published' })}
            >
              Published
            </button>

            <button
              type="button"
              onClick={() => setIsActive('unpublished')}
              className={classNames('events_tabs-button', { 'button-active': isActive === 'unpublished' })}
            >
              Unpublished
            </button>
          </div>

          <div className="events_adder">
            <button
              type="button"
              onClick={() => setAddEvents(true)}
              className="events_adder-button"
            >
              Add Event
            </button>
          </div>
        </div>

        {isActive === 'published' && (
          <Published
            published={publishedEvents}
            setPublished={setPublishedEvents}
            unpublish={unpublishedEvents}
            setUnpublish={setUnpublishedEvents}
            setIsActive={setIsActive}
          />
        )}

        {isActive === 'unpublished' && (
          <Unpublished
            events={unpublishedEvents}
            setEvents={setUnpublishedEvents}
            published={publishedEvents}
            setPublished={setPublishedEvents}
            setIsActive={setIsActive}
          />
        )}
      </div>

      {addEvent && (
        <AddEvents
          setAddEvents={setAddEvents}
          setEvents={setUnpublishedEvents}
          events={unpublishedEvents}
          setIsActive={setIsActive}
          TZ={timezones}
        />
      )}
    </>
  );
};
