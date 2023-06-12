import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../redux/activities/thunks';
import styles from './activities.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Loader from '../Shared/Loader';

function Activities() {
  const { isPending, message, success, error } = useSelector((state) => state.activities);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleModal = () => {
    setShowModal(!showModal);
    setTimeout(() => {
      setShowModal();
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleModal();
      setModalMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getActivities(dispatch);
  }, [dispatch]);

  if (isPending) {
    return (
      <section className={styles.container}>
        <div className={styles.list}>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {error ? (
          <p className={styles.dataError}>{message}</p>
        ) : (
          <>
            <div className={styles.header}>
              <h2 className={styles.title}>Activities</h2>
              <Link to="/activities/create">
                <Button text={'Add'} variant={'add'} />
              </Link>
            </div>
            <Modal
              onClose={() => setShowModal(false)}
              isOpen={showModal}
              title={modalMessage}
              success
            />
            <Table />
          </>
        )}
      </div>
    </section>
  );
}

export default Activities;
