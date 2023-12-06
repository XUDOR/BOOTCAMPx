SELECT 
    students.name AS student,
    AVG(assignment_submissions.duration) AS average_completion_time,
    (SELECT AVG(assignments.duration) FROM assignments) AS average_estimated_duration
FROM students
JOIN assignment_submissions ON students.id = assignment_submissions.student_id
JOIN assignments ON assignment_submissions.assignment_id = assignments.id
WHERE students.end_date IS NULL
GROUP BY students.name
HAVING AVG(assignment_submissions.duration) < (SELECT AVG(assignments.duration) FROM assignments)
ORDER BY average_completion_time;
