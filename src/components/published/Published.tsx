import React, { useState } from 'react';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Event } from '../../react-app-env';
import { Edit } from '../Edit/Edit';
import './Published.scss';

type Props = {
  published: Event[];
  setPublished: (published: Event[]) => void;
  unpublish: Event[],
  setUnpublish: (events: Event[]) => void;
  setIsActive: (isactive: string) => void;
};

export const Published: React.FC<Props> = ({
  published,
  setPublished,
  unpublish,
  setUnpublish,
  setIsActive,
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();
  const [editor, setEditor] = useState<boolean>(false);

  return (
    <div className="cards">
      {published.map(event => (
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
                  setUnpublish([...unpublish, event]);
                  const newArray = published.filter(x => x.id !== event.id);

                  setPublished(newArray);
                  setIsActive('unpublished');
                }}
              >
                Unpublish
              </button>
              <button
                type="button"
                className="menu_delete"
                onClick={() => {
                  const newArray = published.filter(x => x.id !== event.id);

                  setPublished(newArray);
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
