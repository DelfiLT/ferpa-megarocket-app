import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import List from './list';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  const getAllSubscriptions = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions/all`);
    const { data } = await res.json();
    return data;
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      const subscriptions = await getAllSubscriptions();
      setSubscriptions(subscriptions);
    };
    getSubscriptions();
  }, []);

  const deleteSubscription = async (id) => {
    const response = confirm('Are you sure you want to delete this subscription?');
    if (response) {
      await fetch(`${process.env.REACT_APP_API}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
    }
  };

  const createSubscription = async (subscriptionData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
      });
      const { data } = await res.json();
      setSubscriptions([...subscriptions, data]);
      console.log('Suscripción creada:', data);
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
    }
  };

  return (
    <section className={styles.container}>
      <List
        subscriptions={subscriptions}
        onDelete={deleteSubscription}
        onCreate={createSubscription}
      />
    </section>
  );
}

export default Subscriptions;
