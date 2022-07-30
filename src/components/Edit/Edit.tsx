/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Event } from '../../react-app-env';

type Props = {
  setEditor: (editor: boolean) => void;
  currentEvent: Event,
};

export const Edit: React.FC<Props> = ({ setEditor, currentEvent }) => {
  const [newTitle, setNewTitle] = useState<string>(currentEvent.title);
  const [hasTitle, setHasTitle] = useState<boolean>(false);
  const [hasCorrectTitle, setHasCorrectTitle] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasTitle(!newTitle);

    if (newTitle) {
      // eslint-disable-next-line no-param-reassign
      currentEvent.title = newTitle;

      setEditor(false);
    }
  };

  return (
    <div className="edit">
      <div className="adder">
        <div className="adder_block">
          <button
            type="button"
            className="adder_close"
            onClick={() => setEditor(false)}
          >
            x
          </button>
          <form className="adder_form" onSubmit={handleSubmit}>
            <label htmlFor="title">Please edit the title of the event:</label>
            <input
              id="title"
              type="text"
              value={newTitle}
              className="adder_form-input"
              onChange={(event) => {
                setHasTitle(false);

                if (event.target.value.length <= 45) {
                  setHasCorrectTitle(false);
                  setNewTitle(event.target.value);
                } else {
                  setHasCorrectTitle(true);
                }
              }}
            />

            {hasTitle && (
              <div className="text-danger">Title cannot be empty</div>
            )}

            {hasCorrectTitle && (
              <div className="text-danger">This is the maximum length</div>
            )}

            <button
              type="submit"
              className="adder_form-button"
            >
              Change Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
