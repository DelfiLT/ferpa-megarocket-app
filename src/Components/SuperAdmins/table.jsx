import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { deleteSuperAdmin } from '../../redux/superadmins/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Table = () => {
  const [visiblePasswords, setVisiblePasswords] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { data, message, success } = useSelector((state) => state.superadmins);

  const togglePasswordVisibility = (index) => {
    const updatedVisiblePasswords = [...visiblePasswords];
    updatedVisiblePasswords[index] = !updatedVisiblePasswords[index];
    setVisiblePasswords(updatedVisiblePasswords);
  };

  useEffect(() => {
    if (success) {
      setDeleteModal(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <th className={styles.th}>Email:</th>
          <th className={styles.th}>Password:</th>
        </tr>
        {data.map((superadmin, index) => (
          <tr key={superadmin?._id} className={styles.trBody}>
            <td className={styles.td}>{superadmin?.email}</td>
            <td className={styles.td}>
              {visiblePasswords[index]
                ? superadmin?.password
                : '*'.repeat(superadmin?.password.length)}
            </td>
            <td className={styles.td}>
              <Button variant={'seePassword'} clickAction={() => togglePasswordVisibility(index)} />
            </td>
            <td className={styles.td}>
              <Link to={`/super-admins/edit/${superadmin._id}`}>
                <Button variant={'edit'} />
              </Link>
            </td>
            <td className={styles.td}>
              <Button
                variant={'deleteIcon'}
                clickAction={() => {
                  setConfirmModal(true);
                  setCurrentID(superadmin._id);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        warning
        isOpen={confirmModal}
        title={'Delete SuperAdmin'}
        text={'Are you sure you want to delete this SuperAdmin?'}
        onClose={() => setConfirmModal(false)}
      >
        <Button text={'Cancel'} variant={'white'} clickAction={() => setConfirmModal(false)} />
        <Button
          text={'Delete'}
          variant={'delete'}
          clickAction={() => {
            deleteSuperAdmin(dispatch, currentID);
            setConfirmModal(false);
          }}
        />
      </Modal>
      <Modal
        isOpen={deleteModal}
        title={'Super Admin deleted'}
        text={message}
        onClose={() => setDeleteModal(false)}
      >
        <Button text={'OK'} variant={'add'} clickAction={() => setDeleteModal(false)} />
      </Modal>
    </table>
  );
};

export default Table;
