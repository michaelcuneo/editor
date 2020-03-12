import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

const DeletePost = ({ onDelete, postId }) => {
  const input = {
    id: postId,
  };

  const submit = async event => {
    event.preventDefault();
    try {
      await onDelete({ input });
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <Button
      onClick={submit}
      type="submit"
      label="Delete"
      className="p-button-danger"
      icon="pi pi-trash"
      iconPos="right"
    />
  );
};

DeletePost.propTypes = {
  onDelete: PropTypes.func,
  postId: PropTypes.string,
};

export default DeletePost;
