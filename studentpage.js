var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "admin") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}

const totalRooms = 24; // Total number of rooms
// Function to add student data

const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');
const paymentModal = document.getElementById('paymentModal');   
const paymentForm = document.getElementById('paymentForm');
const studentsTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
const closeButton = document.getElementsByClassName('close-button')[0];
const closepaymentButton = document.getElementsByClassName('close-payment-button')[0];
const pendingPaymentsTable = document.getElementById('pendingPaymentsTable').getElementsByTagName('tbody')[0];

// Add Student Form 
function openUpdateModal(index) {
    var students = JSON.parse(localStorage.getItem('students')) || [];        
    currentStudentIndex = index;
    const student = students[index];

    document.getElementById('updatesname').value = student.sname;
    document.getElementById('updatefname').value = student.fname;
    document.getElementById('updatescnic').value = student.scnic;
    document.getElementById('updatefcnic').value = student.fcnic;
    document.getElementById('updaterollno').value = student.rollno;
    document.getElementById('updateroom').value = student.room;
    document.getElementById('updateaddress').value = student.address;
    document.getElementById('updatesnumber').value = student.snumber;
    document.getElementById('updatefnumber').value = student.fnumber;
    document.getElementById('updatedate').value = student.date;
    document.getElementById('updatedegree').value = student.degree;
    document.getElementById('updategender').value = student.gender;
    document.getElementById('updateusername').value = student.username;
    document.getElementById('updatepassword').value = student.password;

    updateModal.style.display = 'block';
}

closeButton.addEventListener('click', () => {
    updateModal.style.display = 'none';
});
closepaymentButton.addEventListener('click', () => {
    paymentModal.style.display = 'none'; 
});


    window.addEventListener('click', (event) => {
        if (event.target === updateModal || event.target === paymentModal ) {
            updateModal.style.display = 'none';
            paymentModal.style.display = 'none'
        }
    });;

updateForm.addEventListener('submit', (e) => {
    
    var students = JSON.parse(localStorage.getItem('students')) || []; 
    const updatesname = document.getElementById('updatesname').value;
    const updatefname = document.getElementById('updatefname').value;
    const updatescnic = document.getElementById('updatescnic').value;
    const updatefcnic = document.getElementById('updatefcnic').value;
    const updaterollno = document.getElementById('updaterollno').value;
    const updateaddress = document.getElementById('updateaddress').value;
    const updatesnumber = document.getElementById('updatesnumber').value;
    const updatefnumber = document.getElementById('updatefnumber').value;
    const updatedate = document.getElementById('updatedate').value;
    const updatedegree = document.getElementById('updatedegree').value;
    const updategender = document.getElementById('updategender').value;
    const updateusername = document.getElementById('updateusername').value;
    const updatepassword = document.getElementById('updatepassword').value;
    const updateroom = document.getElementById('updateroom').value;
    if (!isUnique('username', updateusername, currentStudentIndex)) {
        alert('Username already exists.');
        return;
    }

    if (!isUnique('password', updatepassword, currentStudentIndex)) {
        alert('Password already exists.');
        return;
    }
    if (!isValidRoom(updateroom,  currentStudentIndex)) {
        alert('Invalid room number or room is already full.');
        return;
    }
    if (currentStudentIndex !== null) {
        students[currentStudentIndex].sname = updatesname;
        students[currentStudentIndex].fname = updatefname;
        students[currentStudentIndex].scnic = updatescnic;
        students[currentStudentIndex].fcnic = updatefcnic;
        students[currentStudentIndex].rollno = updaterollno;
        students[currentStudentIndex].room = updateroom;
        students[currentStudentIndex].address= updateaddress;
        students[currentStudentIndex].snumber = updatesnumber;
        students[currentStudentIndex].fnumber = updatefnumber;
        students[currentStudentIndex].date = updatedate;
        students[currentStudentIndex].degree = updatedegree;
        students[currentStudentIndex].gender = updategender;
        students[currentStudentIndex].username = updateusername;
        students[currentStudentIndex].password = updatepassword;


        localStorage.setItem('students', JSON.stringify(students));


        studentsTable.rows[currentStudentIndex + 1].cells[0].textContent = updatesname;
        studentsTable.rows[currentStudentIndex + 1].cells[1].textContent = updaterollno;
        studentsTable.rows[currentStudentIndex + 1].cells[2].textContent = updateroom;

        updateModal.style.display = 'none';
        
    }
});

function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing student list
    students.forEach(function(student) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + student.sname + '</td><td>' + student.rollno + '</td><td>' + student.room + '</td>';
        const actionsCell =row.insertCell(3)
        studentList.appendChild(row); // Add student row to table
       
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update-btn');
        updateButton.addEventListener('click', () => openUpdateModal(row.rowIndex - 1));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('update-btn');
        deleteButton.addEventListener('click', () => deleteStudent(row.rowIndex - 1));
        
        const payButton = document.createElement('button');
        payButton.textContent = 'Pay Bill';
        payButton.classList.add('update-btn');
        payButton.addEventListener('click', () => {
            currentPaymentStudentIndex = row.rowIndex -1;
            paymentModal.style.display = 'block';
        });
        actionsCell.appendChild(updateButton);
        actionsCell.appendChild(deleteButton);
        actionsCell.appendChild(payButton);
        });
}    
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    let student = students[currentPaymentStudentIndex];
    const totalBill = student.currentBill + (student.previousBill || 0);

    if (paymentAmount <= totalBill) {
        student.paidBill = (student.paidBill || 0) + paymentAmount;
        student.currentBill -= paymentAmount;
        if (student.currentBill < 0) {
            student.previousBill += student.currentBill;
            student.currentBill = 0;
        }
        localStorage.setItem('students', JSON.stringify(students));
        alert('Payment recorded successfully!');
        paymentModal.style.display = 'none';
    } else {
        alert('Payment amount exceeds the total bill.');
    }
});

let pendingcount = 0;
function populatePendingPaymentsTable() {
    const students = JSON.parse(localStorage.getItem("students"));
        pendingPaymentsTable.innerHTML = '';

        students.forEach((student, studentIndex) => {
            if (student.sentPayments) {
                student.sentPayments.forEach((payment, paymentIndex) => {
                    if (payment.status === 'pending') {
                        
                        const row = pendingPaymentsTable.insertRow();
                        row.insertCell(0).textContent = student.sname;
                        row.insertCell(1).textContent = payment.amount;

                        const actionsCell = row.insertCell(2);
                        const verifyButton = document.createElement('button');
                        verifyButton.textContent = 'Verify';
                        verifyButton.classList.add('update-btn');
                        verifyButton.addEventListener('click', () => {
                            verifyPayment(studentIndex, paymentIndex);
                        });

                        actionsCell.appendChild(verifyButton);
                        pendingcount++;
                    }
                });
            }
        });
    }

    function verifyPayment(studentIndex, paymentIndex) {
        const students = JSON.parse(localStorage.getItem("students"));

        const student = students[studentIndex];
        const payment = student.sentPayments[paymentIndex];

        student.previousBill -= payment.amount;
        if (student.previousBill < 0) {
            student.currentBill += student.previousBill;
            student.previousBill = 0;
        }
        student.paidBill = (student.paidBill || 0) + payment.amount; // Update the paid bill
        student.sentPayments.splice(paymentIndex, 1);
        localStorage.setItem('students', JSON.stringify(students));
        populatePendingPaymentsTable();
   

}
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        location.reload();
        studentsTable.deleteRow(index + 1);
    }
}
function isUnique(field, value, excludeIndex = null) {
    return students.every((student, index) => {
        return index === excludeIndex || student[field] !== value;
    });
}
function isValidRoom(room, excludeIndex = null) {
    if (room < 1 || room > 24) {
        return false;
    }
    const students = JSON.parse(localStorage.getItem("students"));

    const roomCount = students.filter((student, index) => student.room === room && index !== excludeIndex).length;
    return roomCount < 2;
}
populatePendingPaymentsTable();

document.getElementById('searchInput').addEventListener('input', function() {
    var searchText = this.value.toLowerCase();
    var rows = document.querySelectorAll('#studentList tr');
    rows.forEach(function(row) {
        var name = row.getElementsByTagName('td')[0].innerText.toLowerCase();
        var roll = row.getElementsByTagName('td')[1].innerText.toLowerCase();
        if (name.includes(searchText) || roll.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
const students = JSON.parse(localStorage.getItem('students')) || [];

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
  countPendingComplaints();

  const pendingpaymentsCountContainer = document.getElementById('notificationBadge1');
    function paymentsCountContainer() {
    pendingpaymentsCountContainer.textContent = pendingcount;
    if (pendingcount > 0) {
      notificationBadge1.style.display = 'block';
    } else {
      notificationBadge1.style.display = 'none';
    }
  }
  paymentsCountContainer();
displayStudents();


document.getElementById('access').addEventListener('change', function() {
    const userType = this.value;
    if (userType === "admin") {
        window.location.href = `admin.html`
    }
    else{
      window.location.href = `loginpage.html`
    }
  });

