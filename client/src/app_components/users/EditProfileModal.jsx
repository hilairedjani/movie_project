import React from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfileModal = () => {
  return (
    <div
      className="modal fade"
      id="edit-profile-modal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Profile
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <EditProfileForm></EditProfileForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
