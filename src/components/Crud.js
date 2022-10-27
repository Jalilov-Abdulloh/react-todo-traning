import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik } from "formik";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from "react-toastify";
import './crud.css'
import {AiTwotoneDelete} from 'react-icons/ai'
import {AiOutlineEdit} from 'react-icons/ai'

const Crud = () => {
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [selectedItem, setSelectedItem] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const changeModal = () => {
        setModal(!modal);
    }

    const changeDeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const saveUser = (values) => {
        if (selectedItem.id) {
            axios.put("https://63299b7fd2c97d8c526b6fe5.mockapi.io/Crud/Crud/" + selectedItem.id, values)
                .then((res) => {
                    getUser();
                    setSelectedItem({});
                    changeModal();
                    toast.success("Muvaffaqiyatli o'zgartirildi!");
                })
        } else {
            axios.post("https://63299b7fd2c97d8c526b6fe5.mockapi.io/Crud/Crud", values)
                .then((res) => {
                    getUser();
                    changeModal();
                    toast.success('Muvaffaqiyatli saqlandi!');
                })
                .catch((error) => {
                    toast.error('Xatolik!!!');
                })
        }
    }

    const deleteUser = (id) => {
        setSelectedId(id);
        changeDeleteModal();
    }

    const deleteUserOriginal = () => {
        axios.delete("https://63299b7fd2c97d8c526b6fe5.mockapi.io/Crud/Crud/" + selectedId)
            .then((res) => {
                getUser();
                changeDeleteModal();
                setSelectedId("");
                toast.success("Muvaffaqiyatli o'chirildi!");
            })
            .catch((error) => {
                toast.error('Xatolik!!!')
            })
    }

    const editUser = (item) => {
        setSelectedItem(item);
        changeModal();
    }

    const getUser = () => {
        axios.get("https://63299b7fd2c97d8c526b6fe5.mockapi.io/Crud/Crud")
            .then((res) => {
                setUsers(res.data)
            })
    }


    return (
        <>
            <nav className="nav">
                <img className='img' src="/img/Logo.svg" alt="" />
                <button className='btn btn-primary d-block m-auto mt-5 add' onClick={changeModal}>Create</button>
            </nav>
            <section className='body'>
                {users.map((item, index) => {
                    return (
                        <div className="container">
                            <div className="col-12">
                                <div className="card mb-5">
                                    <div className="card-body d-flex justify-content-between">
                                        <label> <input type="checkbox" className='me-2' />{item.name}</label>
                                        <div><button className='btn btn-primary' onClick={() => editUser(item)}><AiOutlineEdit/></button> <button className='btn btn-danger' onClick={() => deleteUser(item.id)}><AiTwotoneDelete/></button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>

            <Modal isOpen={modal} toggle={changeModal}>
                <ModalHeader>
                    <h3>User Info</h3>
                </ModalHeader>
                <Formik
                    initialValues={{ name: '', }}
                    onSubmit={(values) => {
                        saveUser(values);
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    className='form-control'
                                    placeholder='Name'
                                />
                            </ModalBody>
                            <ModalFooter>
                                <button type="submit" className='btn btn-success' disabled={isSubmitting}>Save</button>
                                <button type='button' className='btn btn-secondary' onClick={changeModal}>Cancel</button>
                            </ModalFooter>
                        </form>
                    )}
                </Formik>
            </Modal>

            <Modal isOpen={deleteModal} toggle={changeDeleteModal}>
                <ModalHeader>
                    <h3>Rostdan ham o'chirmoqchimisiz?</h3>
                </ModalHeader>
                <ModalFooter>
                    <button type='button' className='btn btn-danger' onClick={deleteUserOriginal}>Ha</button>
                    <button type='button' className='btn btn-secondary' onClick={changeDeleteModal}>Yo'q</button>
                </ModalFooter>
            </Modal>

            <ToastContainer autoClose={3000} />
        </>
    );
};

export default Crud;