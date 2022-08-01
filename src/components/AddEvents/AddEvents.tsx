/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { useState } from 'react';
import { Event } from '../../react-app-env';
import './AddEvents.scss';

type Props = {
  setAddEvents: (addEvents: boolean) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
  setIsActive: (isactive: string) => void;
  TZ: string
};

export const AddEvents: React.FC<Props> = ({
  setAddEvents,
  setEvents,
  events,
  setIsActive,
  TZ,
}) => {
  const [title, setTitle] = useState<string>('');
  const [hasTitle, setHasTitle] = useState<boolean>(false);
  const [hasCorrectTitle, setHasCorrectTitle] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTitle(!title);

    if (title) {
      dayjs.extend(utc);
      dayjs.extend(timezone);
      // eslint-disable-next-line max-len
      const time = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

      let id = events.length;

      if (events.some(x => x.id === id)) {
        id = 100 + events.length;
      }

      setEvents([...events, {
        id,
        title,
        isPublished: false,
        currentTime: time,
        time: `${dayjs.tz(time).tz(TZ).hour()}:${dayjs.tz(time).tz(TZ).minute()} - ${dayjs.tz(time).tz(TZ).date()}.${new Date().getMonth()}.${dayjs.tz(time).tz(TZ).year()}`,
      }]);

      setIsActive('unpublished');
      setAddEvents(false);
      setTitle('');
    }
  };

  return (
    <div className="adder">
      <div className="adder_block">
        <button
          type="button"
          className="adder_close"
          onClick={() => setAddEvents(false)}
        >
          x
        </button>
        <form className="adder_form" onSubmit={handleSubmit}>
          <label htmlFor="title">Please write the title of the event:</label>
          <input
            id="title"
            type="text"
            value={title}
            className="adder_form-input"
            placeholder="Yoga Day Event"
            onChange={(event) => {
              setHasTitle(false);

              if (event.target.value.length <= 45) {
                setHasCorrectTitle(false);
                setTitle(event.target.value);
              } else {
                setHasCorrectTitle(true);
              }
            }}
          />

          {hasTitle && (
            <div className="text-danger">Write title</div>
          )}

          {hasCorrectTitle && (
            <div className="text-danger">This is the maximum length</div>
          )}

          <button
            type="submit"
            className="adder_form-button"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};
