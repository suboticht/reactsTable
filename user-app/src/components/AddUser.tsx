import React, { useState } from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { userType } from './UserList';
import axios from 'axios';
import { url } from '../constants';

type Props = {
  onCloseModalAdd: () => void;
  usersGlobal: userType[];
  setUserGlobal: React.Dispatch<React.SetStateAction<userType[]>>;
};

export default function AddUser({ usersGlobal, onCloseModalAdd, setUserGlobal }: Props) {
  const [newUser, setNewUser] = useState<userType>({
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<userType>>({});

  const validateForm = () => {
    let error: Partial<userType> = {};
    const { firstName, lastName, userName, email, password } = newUser;

    if (!firstName.trim()) {
      error = { ...error, firstName: 'First Name is required' };
    }
    if (!lastName.trim()) {
      error = { ...error, lastName: 'Last Name is required' };
    }
    if (!userName.trim()) {
      error = { ...error, userName: 'User Name is required' };
    }
    if (!valiEmail(email)) {
      error = { ...error, email: 'Invalid Email' };
    }
    if (password.trim().length < 8 || !password.match(/[A-Z]/g) || !password.match(/[0-9]/g)) {
      error = {
        ...error,
        password: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
      };
    }

    return error;
  };

  const handleChangeNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lengthGlobal = usersGlobal.length;
    setNewUser({ ...newUser, id: `${lengthGlobal + 1}`, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const valiError = validateForm();
    if (Object.keys(valiError).length > 0) {
      setErrors(valiError);
      return;
    }
    axios.post(url, newUser)
    .then(response => {
      console.log('Post created new user:', response.data);
      setUserGlobal([newUser, ...usersGlobal]);
      onCloseModalAdd();
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
  };

  const valiEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="firstName" />
        </div>
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          placeholder="firstName"
          value={newUser.firstName}
          onChange={handleChangeNewUser}
          required
        />
        {errors.firstName && <p className="text-red-700">{errors.firstName}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="lastName" />
        </div>
        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          placeholder="lastName"
          value={newUser.lastName}
          onChange={handleChangeNewUser}
          required
        />
        {errors.lastName && <p className="text-red-700">{errors.lastName}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="userName" value="userName" />
        </div>
        <TextInput
          id="userName"
          name="userName"
          type="text"
          placeholder="userName"
          value={newUser.userName}
          onChange={handleChangeNewUser}
          required
        />
        {errors.userName && <p className="text-red-700">{errors.userName}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="email" />
        </div>
        <TextInput
          id="email"
          name="email"
          type="text"
          placeholder="name@company.com"
          value={newUser.email}
          onChange={handleChangeNewUser}
          required
        />
        {errors.email && <p className="text-red-700">{errors.email}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChangeNewUser}
          required
        />
        {errors.password && <p className="text-red-700">{errors.password}</p>}
      </div>
      <div className="w-full mt-8">
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </>
  );
}
