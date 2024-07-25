var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "student") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedInStudentName = sessionStorage.getItem('loggedName');

    if (!loggedInStudentName) {
        alert('No student is logged in!');
        window.location.href = 'loginpage.html';
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];
    const currentStudent = students.find(student => student.username === loggedInStudentName);

    if (!currentStudent) {
        alert('Student not found!');
        window.location.href = 'loginpage.html';
        return;
    }

    const currentComplaint = currentStudent.complaints && currentStudent.complaints[0];
    const complaintTextDisplay = document.getElementById('complaintTextDisplay');
    const complaintStatusDisplay = document.getElementById('complaintStatusDisplay');
    const complaintFormContainer = document.getElementById('complaintFormContainer');

    if (currentComplaint) {
        complaintTextDisplay.textContent = `Complaint   :   ${currentComplaint.text}`;
        complaintStatusDisplay.textContent = `Status    :   ${currentComplaint.status}`;
        if (currentComplaint.status === 'pending') {
            complaintFormContainer.style.display = 'none';
        }
    } else {
        complaintTextDisplay.textContent = 'No active complaints.';
        complaintStatusDisplay.textContent = '';
    }

    const complaintForm = document.getElementById('complaintForm');

    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const complaintText = document.getElementById('complaintText').value;
        const complaint = {
            text: complaintText,
            status: 'pending',
        };

        currentStudent.complaints = [complaint];  // Overwrite any existing complaint

        const studentIndex = students.findIndex(student => student.sname === currentStudent.sname);
        students[studentIndex] = currentStudent;

        localStorage.setItem('students', JSON.stringify(students));
        alert('Complaint submitted successfully!');
        location.reload();  // Reload the page to update the complaint display
    });
    const studentbill = students.find(student => student.username === loggedInStudentName);        
    const pendingtotalbill = document.getElementById('notificationBadge');
    function counttotalbill() {
    let count = 0;
        if (studentbill.currentBill>0) {
            count++;
        }
    pendingtotalbill.textContent = count;
        if (count > 0) {
            notificationBadge.style.display = 'block';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    counttotalbill();
});


document.getElementById('access').addEventListener('change', function() {
    const userType = this.value;
    if (userType === "student") {
        window.location.href = `student.html`
    }
    else{
      window.location.href = `loginpage.html`
    }
  });