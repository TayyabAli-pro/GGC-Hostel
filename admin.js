var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "admin") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}
var students = JSON.parse(localStorage.getItem('students')) || [];

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
// Function to update student count
function updateStudentCount() {
var students = JSON.parse(localStorage.getItem('students')) || [];
document.getElementById('box1').textContent = students.length;
}


const remainingRooms = document.getElementById("box2");
const totalRooms = 24; // Total number of rooms


function updateRoomInfo() {
  if (localStorage.getItem("students")) {
      const students = JSON.parse(localStorage.getItem("students"));
      const occupiedRooms = [...new Set(students.map(student => student.room))].length;
      const remaining = totalRooms - occupiedRooms;
      remainingRooms.textContent = remaining;
      const allocatedroom= totalRooms - remaining;
      let allocated = document.getElementById('box4')
      allocated.textContent= allocatedroom;
  } else {
      remainingRooms.textContent = totalRooms;
  }
}


function displayStudents() {
  var students = JSON.parse(localStorage.getItem('students')) || [];
  var studentList = document.getElementById('studentList');
  studentList.innerHTML = ''; // Clear existing student list
  const recentStudents = students.slice(-4); // Get the last 4 students
  recentStudents.forEach(function(student) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + student.sname + '</td><td>' + student.rollno + '</td><td>' + student.room + '</td>';
      studentList.appendChild(row); // Add student row to table
  });


}
// Call displayRecentlyAddedStudents() when the page loads and after a new student is added
document.addEventListener("DOMContentLoaded", function() {
  displayStudents();
});

updateStudentCount();

updateRoomInfo();

let icon1= document.getElementById('tag1')
icon1.onclick = () => {
    let color = document.getElementById('icon1') 
    color.style.backgroundColor= 'rgb(127, 36, 230)';
};

document.getElementById('access').addEventListener('change', function() {
  const userType = this.value;
  if (userType === "admin") {
      window.location.href = `admin.html`
  }
  else{
    window.location.href = `loginpage.html`
  }
});


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

