export const getSenderName = (user, users) => {
  return users[0]._id === user._id
    ? users?.[1]?.name ?? "User Not found"
    : users[0].name;
};
