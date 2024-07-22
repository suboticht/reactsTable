import { Button, Modal, Pagination, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import EditUser from './EditUser';
import AddUser from './AddUser';
import axios, { AxiosResponse } from 'axios';
import { url } from '../constants';

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
    const [users, setUsers] = useState<userType[]>([]);
    const [usersPage, setUsersPage] = useState<userType[]>([]);
    const [editUserId, setEditUserId] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(2);

    useEffect(() => {
        async function getUsers(): Promise<userType[]> {
            let response = await axios.get<userType[]>(url);
            return response.data;
        }
        (async () => {
            let users = await getUsers();
            setUsers(users);
        })();
    }, [])

    useEffect(() => {
        setUsersPage(users.slice(5*(currentPage-1), 5*(currentPage-1)+5));
        setTotalPages(Math.ceil(users.length / 5));
        
    },[users, currentPage])

    function onCloseModalEdit() {
        setopenModalEdit(false);
    }
    function onCloseModalAdd() {
        setopenModalAdd(false);
    }
    const handleRemoveUser = (userindex: number) => {
        const id:number = users[userindex].id;
        
        axios.delete(url+id)
        .then(response => {
            console.log('user deleted:', response.data);
            const updatedUsers = users.filter(user => user.id !== response.data.id)
            setUsers(updatedUsers)
            
        }).catch((error) => {
            console.error('Error deleting user:', error);
        });
        // users.splice(userId, 1);
        // const newUsers = [...users]
        // setUsers(newUsers);
    }
    const handleEditUser = (userId: number) => {
        setEditUserId(userId);
        setopenModalEdit(true)
    }
    const handleAddUser = () => {
        setopenModalAdd(true)
    }
    const handlePageChange = (page:number) => {
        setCurrentPage(page)
    }
    
  return (
    <div className="overflow-x-auto">
        <div className="w-full mt-8">
            <Button
                className='mb-8'
                onClick={handleAddUser}
            >Add User</Button>
        </div>
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell className='w-1/5'>firstName</Table.HeadCell>
                    <Table.HeadCell className='w-1/5'>lastName</Table.HeadCell>
                    <Table.HeadCell className='w-1/5'>userName</Table.HeadCell>
                    <Table.HeadCell className='w-1/5'>email</Table.HeadCell>
                    <Table.HeadCell className='w-1/5'>actions</Table.HeadCell>
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
                                    <div className='flex justify-between items-start max-w-[30px] gap-1'>
                                        <Button
                                            className='w-10'
                                            onClick={() => handleEditUser(item.id)}
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
        </div>
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
                    userData={users.find((user) => Number(user.id) == editUserId)!}
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
