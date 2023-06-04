import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import Table from './Table';
import AddForm from './AddForm';
import EditForm from './EditForm';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [currentDes, setCurrentDes] = useState('');
  const [currentId, setCurrentId] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, description });
    setName('');
    setDescription('');
  };
  const onDelete = async (id) => {
    try {
      const response = window.confirm('Are you sure you want to delete this activity?');
      if (response) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        setActivities([...activities.filter((activity) => activity._id !== id)]);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onAdd = async ({ name, description }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          isActive: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setActivities([...activities, data.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const onEdit = async (id) => {
    const index = activities.findIndex((activity) => activity._id === id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: currentName,
          description: currentDes,
          isActive: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      const update = [...activities];
      update[index] = data.data;
      console.log(update[index]);
      setActivities(update);
    } catch (error) {
      console.error(error);
    }
  };
  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/`);
      const data = await res.json();
      setActivities(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Activities Management</h2>
      <Table
        activities={activities}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        setShowAdd={setShowAdd}
        setCurrentName={setCurrentName}
        setCurrentDes={setCurrentDes}
        setCurrentId={setCurrentId}
        onDelete={onDelete}
      />
      <div className={styles.btnSection}>
        <button
          onClick={() => {
            setShowAdd(!showAdd);
            setShowEdit(false);
          }}
        >
          Add
        </button>
      </div>
      {showAdd && (
        <AddForm
          onSubmit={onSubmit}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      )}
      {showEdit && (
        <EditForm
          onSubmit={onSubmit}
          currentName={currentName}
          currentDes={currentDes}
          setCurrentName={setCurrentName}
          setCurrentDes={setCurrentDes}
          onEdit={onEdit}
          currentId={currentId}
          setShowEdit={setShowEdit}
          showEdit={showEdit}
        />
      )}
    </section>
  );
}

export default Activities;
