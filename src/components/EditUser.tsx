import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { userType } from './UserList';

type Props = {
  editUserId: number;
  userData: userType;
  usersGlobal: userType[];
  onCloseModalEdit: () => void;
  setUserGlobal: React.Dispatch<React.SetStateAction<userType[]>>
}

const EditUser = ({ userData, usersGlobal, editUserId, setUserGlobal, onCloseModalEdit }: Props ) => {
  const [userProps, setUserProps] = useState<userType>(userData);

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProps({...userProps, [e.target.name] : e.target.value});
  }
  const handleSave = () => {
    const newUsersGlobal = [...usersGlobal]
    newUsersGlobal[editUserId] = userProps;
    setUserGlobal(newUsersGlobal)
    onCloseModalEdit();
  }
  
return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="firstName" />
        </div>
        <TextInput
          id="firstName"
          name='firstName'
          type='text'
          placeholder="firstName"
          value={userProps.firstName}
          onChange={handleChangeUser}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="lastName" />
        </div>
        <TextInput
          id="lastName"
          name='lastName'
          type='text'
          placeholder="lastName"
          value={userProps.lastName}
          onChange={handleChangeUser}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="userName" value="userName" />
        </div>
        <TextInput
          id="userName"
          name='userName'
          type='text'
          placeholder="userName"
          value={userProps.userName}
          onChange={handleChangeUser}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="email" />
        </div>
        <TextInput
          id="email"
          name='email'
          type='text'
          placeholder="name@company.com"
          value={userProps.email}
          onChange={handleChangeUser}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="password" />
        </div>
        <TextInput
          id="password"
          name='password'
          type='password'
          placeholder="name@company.com"
          value={userProps.password}
          onChange={handleChangeUser}
          required
        />
      </div>
      <div className="w-full mt-8">
        <Button
          onClick={handleSave}
        >Save</Button>
      </div>
    </>
  )
}

export default EditUser;