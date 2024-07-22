import { Button, Checkbox, Label, Modal, Pagination, Table, TextInput } from 'flowbite-react'
import React, { Key, useEffect, useState } from 'react'
import { globalUsers } from '../constants'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import EditUser from './EditUser';
import AddUser from './AddUser';

export type userType = {
    id?: any,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
};

export default function UserList() {
    const [openModalEdit, setopenModalEdit] = useState<boolean>(false);
    const [openModalAdd, setopenModalAdd] = useState<boolean>(false);
    const [users, setUsers] = useState<userType[]>(globalUsers);
    const [usersPage, setUsersPage] = useState<userType[]>([]);
    const [editUserId, setEditUserId] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2);

    function onCloseModalEdit() {
        setopenModalEdit(false);
    }
    function onCloseModalAdd() {
        setopenModalAdd(false);
    }
    const handleRemoveUser = (userId: number) => {
        users.splice(userId, 1);
        const newUsers = [...users]
        setUsers(newUsers);
    }
    const handleEditUser = (userId: number) => {
        setEditUserId(userId+1);
        setopenModalEdit(true)
    }
    const handleAddUser = () => {
        setopenModalAdd(true)
    }
    const handlePageChange = (page:number) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setUsersPage(users.slice(5*(currentPage-1), 5*(currentPage-1)+5));
        setTotalPages(Math.ceil(users.length / 5));
        
    },[users, currentPage])
    
  return (
    <div className="overflow-x-auto">
      <div className="w-full mt-8">
        <Button
            className='mb-8'
            onClick={handleAddUser}
        >Add User</Button>
      </div>
        <Table>
            <Table.Head>
                <Table.HeadCell>firstName</Table.HeadCell>
                <Table.HeadCell>lastName</Table.HeadCell>
                <Table.HeadCell>userName</Table.HeadCell>
                <Table.HeadCell>email</Table.HeadCell>
                <Table.HeadCell>actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {
                    usersPage
                    .map((item, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{item.firstName}</Table.Cell>
                            <Table.Cell>{item.lastName}</Table.Cell>
                            <Table.Cell>{item.userName}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>
                                <div className='flex justify-between items-center max-w-[30px] ml-10 gap-1'>
                                    <Button
                                        className='w-10'
                                        onClick={() => handleEditUser(index)}
                                    >
                                        <HiOutlinePencilAlt />
                                    </Button>
                                    <Button
                                        color='failure'
                                        className='w-10'
                                        onClick={() => handleRemoveUser(index)}
                                    >
                                        <HiOutlineTrash />
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>

        <div className="flex overflow-x-auto sm:justify-center mt-4">
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
        </div>
        <Modal show={openModalEdit} size="lg" onClose={onCloseModalEdit} popup>
            <Modal.Header />
            <Modal.Body>
                <EditUser 
                    userData={users.find((user) => user.id === editUserId)!}
                    setUserGlobal={setUsers}
                    usersGlobal={users}
                    onCloseModalEdit={onCloseModalEdit}
                    editUserId={editUserId!}
                />
            </Modal.Body>
        </Modal>
        <Modal show={openModalAdd} size="lg" onClose={onCloseModalAdd} popup>
            <Modal.Header />
            <Modal.Body>
                <AddUser 
                    setUserGlobal={setUsers}
                    usersGlobal={users}
                    onCloseModalAdd={onCloseModalAdd}
                />
            </Modal.Body>
        </Modal>
    </div>
  )
}
