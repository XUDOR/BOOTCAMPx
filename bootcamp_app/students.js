const { Pool } = require('pg');

// Set up your database connection information
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Capture command-line arguments
const cohortName = process.argv[2];
const limit = process.argv[3] || 5; // Default to 5 if no limit is provided

// Parameterized query to prevent SQL injection
// Using placeholders ($1, $2) for dynamic values
const queryString = `
  SELECT students.id, students.name, cohorts.name AS cohort_name
  FROM students
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

// Values to be used in the query - corresponds to placeholders in queryString
const queryValues = [`%${cohortName}%`, limit];

// Executing the query with parameterized values
pool.query(queryString, queryValues)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
    });
  })
  .catch(err => console.error('Error executing query', err.stack));
