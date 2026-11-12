
import React, { useState, useEffect } from 'react';

function StudProfile(props) {

  // Props Destructuring
  const {
    selectedStudentId,
    setSelectedStudentId
  } = props;

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Particular Student By ID
  useEffect(() => {

    if (selectedStudentId === null) {
      return;
    }

    const controller = new AbortController();

    const fetchStudent = async () => {

      try {

        setLoading(true);
        setError('');
        setStudent(null);

        const response = await fetch(
          `https://dummyjson.com/users/${selectedStudentId}`,
          {
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error('Student not found');
        }

        const data = await response.json();

        setStudent(data);

      } catch (err) {

        if (err.name !== 'AbortError') {
          setError(err.message);
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }

    };

    fetchStudent();

    return () => controller.abort();

  }, [selectedStudentId]); // Dependency Array

  if (loading) {
    return <h2>Loading Student Details...</h2>;
  }

  if (error) {

    return (
      <div style={styles.container}>

        <h3>{error}</h3>

        <button
          onClick={() => setSelectedStudentId(null)}
          style={styles.button}
        >
          Back To Students
        </button>

      </div>
    );

  }

  if (!student) {
    return null;
  }

  return (

    <div style={styles.container}>

      <button
        onClick={() => setSelectedStudentId(null)}
        style={styles.backButton}
      >
        ← Back To Students
      </button>

      <div style={styles.profile}>

        <img
          src={student.image}
          alt={student.firstName}
          style={styles.image}
        />

        <h1>
          {student.firstName} {student.lastName}
        </h1>

        <p style={styles.id}>
          Student ID: {student.id}
        </p>

      </div>

      <h2>Personal Information</h2>

      <div style={styles.grid}>

        <Detail label="First Name" value={student.firstName} />
        <Detail label="Last Name" value={student.lastName} />
        <Detail label="Age" value={student.age} />
        <Detail label="Gender" value={student.gender} />
        <Detail label="Email" value={student.email} />
        <Detail label="Phone" value={student.phone} />
        <Detail label="Birth Date" value={student.birthDate} />
        <Detail label="Blood Group" value={student.bloodGroup} />
        <Detail label="Height" value={`${student.height} cm`} />
        <Detail label="Weight" value={`${student.weight} kg`} />
        <Detail label="Eye Color" value={student.eyeColor} />
        <Detail label="University" value={student.university} />

      </div>

      <h2>Company Information</h2>

      <div style={styles.grid}>

        <Detail label="Company" value={student.company?.name} />
        <Detail label="Department" value={student.company?.department} />
        <Detail label="Job Title" value={student.company?.title} />

      </div>

      <h2>Address Information</h2>

      <div style={styles.grid}>

        <Detail label="Address" value={student.address?.address} />
        <Detail label="City" value={student.address?.city} />
        <Detail label="State" value={student.address?.state} />
        <Detail label="Country" value={student.address?.country} />
        <Detail label="Postal Code" value={student.address?.postalCode} />

      </div>

    </div>

  );

}

// Reusable Detail Component
function Detail(props) {

  // Props Destructuring
  const { label, value } = props;

  return (

    <div style={styles.detailCard}>

      <b>{label}</b>

      <p>{value ?? 'N/A'}</p>

    </div>

  );

}

const styles = {

  container: {
    maxWidth: '1100px',
    margin: 'auto',
    padding: '25px',
    fontFamily: 'Arial, sans-serif'
  },

  profile: {
    textAlign: 'center',
    marginBottom: '30px'
  },

  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover'
  },

  id: {
    color: '#2563eb',
    fontWeight: 'bold'
  },

  backButton: {
    padding: '11px 20px',
    background: '#374151',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '25px'
  },

  button: {
    padding: '11px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },

  detailCard: {
    padding: '15px',
    background: '#f3f4f6',
    borderRadius: '8px',
    overflowWrap: 'anywhere'
  }

};

export default StudProfile;
