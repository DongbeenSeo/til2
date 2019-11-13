import React from 'react';

const Profile = ({ usename, name }) => {
  return (
    <div>
      <b>{usename}</b>&nbsp;
      <span>({name})</span>
    </div>
  );
};

export default Profile;
