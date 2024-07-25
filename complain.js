var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "admin") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
  const complaintsTable = document.getElementById('complaintsTable').getElementsByTagName('tbody')[0];
  let students = JSON.parse(localStorage.getItem('students')) || [];
  const pendingComplaintsCountContainer = document.getElementById('notificationBadge');

  function countPendingComplaints() {
    let count = 0;
    students.forEach(student => {
        if (student.complaints && student.complaints[0].status === 'pending') {
            count++;
        }
    });
    pendingComplaintsCountContainer.textContent = count;
    if (count > 0) {
      notificationBadge.style.display = 'block';
    } else {
      notificationBadge.style.display = 'none';
    }
}

  function displayComplaints() {
      complaintsTable.innerHTML = '';

      students.forEach(student => {
          if (student.complaints) {
              const complaint = student.complaints[0];
              const row = complaintsTable.insertRow();

              const studentNameCell = row.insertCell(0);
              const complaintTextCell = row.insertCell(1);
              const complaintStatusCell = row.insertCell(2);
              const actionsCell = row.insertCell(3);

              studentNameCell.textContent = student.sname;
              complaintTextCell.textContent = complaint.text;
              complaintStatusCell.textContent = complaint.status;

              const acceptButton = document.createElement('button');
              acceptButton.textContent = 'Accept';
              acceptButton.classList.add('update-btn');
              acceptButton.addEventListener('click', () => {
                  student.complaints[0].status = 'accepted';
                  localStorage.setItem('students', JSON.stringify(students));
                  displayComplaints();
              });

              const rejectButton = document.createElement('button');
              rejectButton.textContent = 'Reject';
              rejectButton.classList.add('update-btn');
              rejectButton.addEventListener('click', () => {
                  student.complaints[0].status = 'rejected';
                  localStorage.setItem('students', JSON.stringify(students));
                  displayComplaints();
              });

              actionsCell.appendChild(acceptButton);
              actionsCell.appendChild(rejectButton);
          }
      });
      countPendingComplaints();
  }

  displayComplaints();
const Count = document.getElementById('notificationBadge1');
function countPendingPayments() {
    
    let pendingCount = 0;
    
    students.forEach(student => {
      if (student.sentPayments) {
        student.sentPayments.forEach(payment => {
                  if (payment.status === 'pending') {
                      pendingCount++;
                  }
              });
          }
      });
    Count.textContent = pendingCount;
    if (pendingCount > 0) {
      notificationBadge1.style.display = 'block';
    } else {
      notificationBadge1.style.display = 'none';
    }
  }
  

  countPendingPayments();


  });

document.getElementById('access').addEventListener('change', function() {
  const userType = this.value;
  if (userType === "admin") {
      window.location.href = `admin.html`
  }
  else{
    window.location.href = `loginpage.html`
  }
});