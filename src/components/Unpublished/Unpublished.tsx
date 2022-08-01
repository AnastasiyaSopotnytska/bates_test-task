/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import './Unpublished.scss';
import { Event } from '../../react-app-env';
import { Edit } from '../Edit/Edit';

type Props = {
  events: Event[],
  setEvents: (events: Event[]) => void;
  published: Event[],
  setPublished: (published: Event[]) => void;
  setIsActive: (isactive: string) => void;
};

export const Unpublished: React.FC<Props> = ({
  events,
  setEvents,
  published,
  setPublished,
  setIsActive,
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [editor, setEditor] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  return (
    <div className="cards">
      {events.map(event => (
        <div key={event.id} className="card">
          <h2 className="card_title">
            {event.title}
          </h2>

          <button
            type="button"
            className="card_button"
            onClick={() => {
              setMenu(!menu);
              setIndex(event.id);
            }}
          >
          </button>

          {menu && index === event.id && (
            <div className="menu">
              <button
                type="button"
                className="menu_edit"
                onClick={() => setEditor(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="menu_publish"
                onClick={() => {
                  const newEvent = {
                    id: published.length,
                    title: event.title,
                    time: event.time,
                    isPublished: event.isPublished,
                    currentTime: event.currentTime,
                  };

                  setPublished([...published, newEvent]);
                  const newArray = events.filter(x => x.id !== event.id);

                  setEvents(newArray);
                  setIsActive('published');
                }}
              >
                Publish
              </button>
              <button
                type="button"
                className="menu_delete"
                onClick={() => {
                  const newArray = events.filter(x => x.id !== event.id);

                  setEvents(newArray);
                }}
              >
                Delete
              </button>
            </div>
          )}

          { editor && (
            <Edit setEditor={setEditor} currentEvent={event} />
          )}

          <div className="card_time">{event.time}</div>
        </div>
      ))}
    </div>
  );
};
