var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "admin") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
    const messForm = document.getElementById('messForm');
    const messStudentName = document.getElementById('messStudentName');
    const messTable = document.getElementById('messTable').getElementsByTagName('tbody')[0];
    const menuTable = document.getElementById('menuTable').getElementsByTagName('tbody')[0];
    const updateMenuModal = document.getElementById('updateMenuModal');
    const closeButton = document.querySelector('#updateMenuModal .close-button');
    const updateMenuForm = document.getElementById('updateMenuForm');
    const pendingComplaintsCountContainer = document.getElementById('notificationBadge');


    let students = JSON.parse(localStorage.getItem('students')) || [];
    let messMenu = JSON.parse(localStorage.getItem('messMenu')) || {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
    }

    students.forEach(student => {
        appendStudentToDropdown(student);
    });

    messForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentName = messStudentName.value;
        const currentBill = parseFloat(document.getElementById('currentBill').value);

        const studentIndex = students.findIndex(student => student.sname === studentName);
        if (studentIndex !== -1) {
            students[studentIndex].previousBill += students[studentIndex].currentBill;
            students[studentIndex].currentBill = currentBill;
            students[studentIndex].paidBill = 0;

            localStorage.setItem('students', JSON.stringify(students));

            updateMessTable();
            messForm.reset();
        }
    });

    function appendStudentToDropdown(student) {
        const option = document.createElement('option');
        option.value = student.sname;
        option.textContent = student.sname;
        messStudentName.appendChild(option);
    }

    function updateMessTable() {
        messTable.innerHTML = ''; // Clear existing table

        students.forEach(student => {
            const row = messTable.insertRow();

            const nameCell = row.insertCell(0);
            const previousBillCell = row.insertCell(1);
            const currentBillCell = row.insertCell(2);
            const totalBillCell = row.insertCell(3);
            const paidBillCell = row.insertCell(4);

            nameCell.textContent = student.sname;
            currentBillCell.textContent = student.currentBill;
            previousBillCell.textContent = student.previousBill;
            totalBillCell.textContent = student.previousBill + student.currentBill;
            paidBillCell.textContent = student.paidBill;
        });
    }

    updateMessTable(); // Initialize the mess table with current data

        // Display the mess menu
        for (const day in messMenu) {
            document.getElementById(`${day}MenuDisplay`).textContent = messMenu[day];
        }
        // Open the update menu modal when update menu button is clicked
        document.querySelectorAll('.update-menu-btn').forEach(button => {
            button.addEventListener('click', () => {
                const day = button.getAttribute('data-day');
                updateMenuForm.dataset.day = day;
                document.getElementById('menuContent').value = messMenu[day];
                updateMenuModal.style.display = 'block';
            });
        });
            // Close the update menu modal when close button is clicked
    closeButton.addEventListener('click', () => {
        updateMenuModal.style.display = 'none';
    });

    // Close the update menu modal when clicked outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === updateMenuModal) {
            updateMenuModal.style.display = 'none';
        }
    });

    // Update the menu and save to local storage when form is submitted
    updateMenuForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const day = updateMenuForm.dataset.day;
        const menuContent = document.getElementById('menuContent').value;
        messMenu[day] = menuContent;

        localStorage.setItem('messMenu', JSON.stringify(messMenu));
        document.getElementById(`${day}MenuDisplay`).textContent = menuContent;

        updateMenuModal.style.display = 'none';
        alert('Menu updated successfully!');
    });    


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