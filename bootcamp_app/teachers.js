const { Pool } = require('pg');

// Set up your database connection information
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Capture the cohort name from command-line arguments
// Default to 'JUL02' if no argument is provided
const cohortName = process.argv[2] || 'JUL02';

// Parameterized query to prevent SQL injection
// Using a placeholder ($1) for the dynamic cohort name value
const queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name = $1
  ORDER BY teacher;
`;

// Values to be used in the query - corresponds to the placeholder in queryString
const queryValues = [cohortName];

// Executing the query with parameterized values
pool.query(queryString, queryValues)
  .then(res => {
    // Iterate over each row in the response
    res.rows.forEach(row => {
      // Log the cohort and teacher name
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error('Error executing query', err.stack));
