SELECT name, id, cohort_id
FROM students
WHERE (email IS NULL OR email = '') AND (phone IS NULL OR phone = '');
