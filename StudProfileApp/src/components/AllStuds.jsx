
import React, { useState, useEffect } from 'react';

function AllStuds(props) {

  // Props Destructuring
  const {
    selectedStudentId,
    setSelectedStudentId
  } = props;

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch All Students
  useEffect(() => {

    const fetchStudents = async () => {

      try {

        setLoading(true);
        setError('');

        const response = await fetch(
          'https://dummyjson.com/users?limit=100'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();

        setStudents(data.users || []);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchStudents();

  }, []);

  // Search Students
  const filteredStudents = students.filter((student) => {

    const searchData = `
      ${student.firstName}
      ${student.lastName}
      ${student.email}
      ${student.university}
      ${student.address?.city || ''}
    `;

    return searchData
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  });

  if (loading) {
    return <h2>Loading Students...</h2>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (

    <div style={styles.container}>

      <h1>Student Directory</h1>

      <input
        type="text"
        placeholder="Search student..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.search}
      />

      <h3>
        Total Students: {students.length}
        {' | '}
        Showing: {filteredStudents.length}
      </h3>

      <div style={styles.grid}>

        {filteredStudents.map((student) => (

          <div key={student.id} style={styles.card}>

            <img
              src={student.image}
              alt={student.firstName}
              style={styles.image}
            />

            <h3>
              {student.firstName} {student.lastName}
            </h3>

            <p><b>ID:</b> {student.id}</p>

            <p><b>Email:</b> {student.email}</p>

            <p>
              <b>University:</b>
              {student.university || 'N/A'}
            </p>

            <p>
              <b>City:</b>
              {student.address?.city || 'N/A'}
            </p>

            <button
              onClick={() => setSelectedStudentId(student.id)}
              style={styles.button}
            >
              View Details
            </button>

          </div>

        ))}

      </div>

      {filteredStudents.length === 0 && (
        <h3>No Students Found</h3>
      )}

    </div>

  );

}

const styles = {

  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '25px',
    fontFamily: 'Arial, sans-serif'
  },

  search: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '15px',
    boxSizing: 'border-box'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },

  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
    background: '#fff'
  },

  image: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover'
  },

  button: {
    padding: '11px 20px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }

};

export default AllStuds;
