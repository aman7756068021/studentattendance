import React, { useState, useEffect } from 'react';

function Attendance() {
  // Declare a state variable to store the list of students
  const [students, setStudents] = useState([]);

  // Declare a state variable to store the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Declare a state variable to store the current count of students in school
  const [studentCount, setStudentCount] = useState(0);

  // Use the useEffect hook to update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle the submission of a new student's attendance
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const rollNumber = form.elements.rollNumber.value;
    const name = form.elements.name.value;
    const checkInTime = currentTime;
    setStudents((prevStudents) => [...prevStudents, { rollNumber, name, checkInTime, checkOutTime: null }]);
    setStudentCount((prevCount) => prevCount + 1);
    form.reset();
  };

  // Function to handle the checkout of a student
  const handleCheckout = (rollNumber) => {
    setStudents((prevStudents) => prevStudents.map((student) => {
      if (student.rollNumber === rollNumber) {
        return { ...student, checkOutTime: currentTime };
      }
      return student;
    }));
    setStudentCount((prevCount) => prevCount - 1);
  };

  return (
    <div >
      <h1>Student Attendance</h1>
      <form  onSubmit={handleSubmit}>
        <label htmlFor="rollNumber">
          Roll Number:
          <input type="text" name="rollNumber" />
        </label>
        <br />
        <br/>

        <label htmlFor="name">
          Name:
        
                  <input type="text"  your name="name"  />
        </label>
        <br />
        
        <br />
        <button type="submit">Check In</button>
      </form>
      <br />
   
      <h2>Current Students ({studentCount})</h2>
      <ul>
        {students.map((student) => (
          <li key={student.rollNumber}>
            {student.name} ({student.rollNumber})
            {student.checkOutTime ? (
              <span> - Checked out at {student.checkOutTime.toLocaleTimeString()}</span>
            ) : (
              <button onClick={() => handleCheckout(student.rollNumber)}>Check Out</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;