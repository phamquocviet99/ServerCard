import taskSendInvitationModal from "../models/taskSendInvitation.model.js";

export const addTask = async (data) => {
  try {
    const task = new taskSendInvitationModal(data);
    return new Promise(function (resolve, reject) {
      task
        .save()
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((err) => reject(new Error(err)));
    });
  } catch (error) {
    return new Error(error);
  }
};
