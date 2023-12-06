SELECT SUM(assignment_submissions.duration) AS total_duration
FROM students
JOIN assignment_submissions ON students.id = assignment_submissions.student_id
JOIN assignments ON assignment_submissions.assignment_id = assignments.id
WHERE students.name = 'Ibrahim Schimmel';
