export const getSender = (loggedUser, Users) => {
  Users.map((data) => {
    if (data !== loggedUser) {
      return data;
    }
  });
};

export const isSameSender = (messages, m, i, userId) => {};
