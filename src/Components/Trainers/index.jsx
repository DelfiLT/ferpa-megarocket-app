import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTrainers, deleteTrainer } from 'redux/trainers/thunks';
import styles from './trainers.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Loader from 'Components/Shared/Loader';

const Trainers = () => {
  const [currentId, setCurrentId] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, trainers, error, formError } = useSelector((state) => state.trainers);

  useEffect(() => {
    getTrainers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (successModal) {
      setTimeout(() => {
        setSuccessModal(!successModal);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successModal]);

  if (formError) {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <div className={styles.inside}>
            <h2 className={styles.title}>Trainers</h2>
          </div>
          <p className={`${styles.title} ${styles.centered}`}>{error}</p>
        </div>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <div className={styles.inside}>
            <h2 className={styles.title}>Trainers</h2>
          </div>
          <div className={styles.loading}>
            <Loader />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <Modal
        warning
        isOpen={deleteModal}
        onClose={() => setDeleteModal(!deleteModal)}
        title={'Delete Trainer'}
        text={'Are you sure you want to delete this Trainer?'}
        data-testid={'confirm-modal'}
      >
        <Button
          text={'Delete'}
          variant={'delete'}
          clickAction={() => {
            deleteTrainer(dispatch, currentId);
            setDeleteModal(!deleteModal);
            setSuccessModal(!successModal);
          }}
          testid={'confirm-btn'}
        />
        <Button
          text={'Cancel'}
          variant={'white'}
          clickAction={() => setDeleteModal(!deleteModal)}
          testid={'cancel-btn'}
        />
      </Modal>
      <Modal
        success
        isOpen={successModal}
        onClose={() => setSuccessModal(!successModal)}
        title={error}
        data-testid={'success-modal'}
      ></Modal>
      <div className={styles.header} data-testid={'trainer-table-container'}>
        <div className={styles.inside}>
          <h2 className={styles.title}>Trainers</h2>
          <Link to={'/admin/trainers/form'}>
            <Button text={'Add'} variant={'add'} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.titles}>Name</th>
              <th className={styles.titles}>Last Name</th>
              <th className={styles.titles}>Phone</th>
              <th className={styles.titles}>Email</th>
              <th className={styles.titles}>Activities</th>
              <th className={styles.titles}></th>
              <th className={styles.titles}></th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className={styles.list}>{item.firstName}</td>
                  <td className={styles.list}>{item.lastName}</td>
                  <td className={styles.list}>{item.phone}</td>
                  <td className={styles.list}>{item.email}</td>
                  <td className={styles.list}>
                    {item.activities.map((activity) => activity.name).join(' / ')}
                  </td>
                  <td>
                    <div className={styles.buttons}>
                      <Link to={`/admin/trainers/form/${item._id}`}>
                        <Button variant={'edit'} />
                      </Link>
                      <Button
                        variant={'deleteIcon'}
                        clickAction={() => {
                          setDeleteModal(!deleteModal);
                          setCurrentId(item._id);
                        }}
                        testid={'delete-btn'}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Trainers;
