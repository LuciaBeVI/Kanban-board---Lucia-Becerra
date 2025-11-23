import React from "react";

const Avatar = ({ user }: { user: string }) => {
  return <div>{user[0].toUpperCase()}</div>;
};

export default Avatar;
