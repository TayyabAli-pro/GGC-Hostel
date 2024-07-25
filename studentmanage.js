var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "student") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}
document.getElementById('access').addEventListener('change', function() {
    const userType = this.value;
    if (userType === "student") {
        window.location.href = `student.html`
    }
    else{
      window.location.href = `loginpage.html`
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const student1 = sessionStorage.getItem('loggedName');
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const index = students.findIndex(student => student.username === student1);
    const student = students[index]

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
      if (!isUnique('username', updateusername, index)) {
          alert('Username already exists.');
          return;
      }
  
      if (!isUnique('password', updatepassword, index)) {
          alert('Password already exists.');
          return;
      }
      if (!isValidRoom(updateroom,  index)) {
          alert('Invalid room number or room is already full.');
          return;
      }
      if (index !== null) {
          students[index].sname = updatesname;
          students[index].fname = updatefname;
          students[index].scnic = updatescnic;
          students[index].fcnic = updatefcnic;
          students[index].rollno = updaterollno;
          students[index].room = updateroom;
          students[index].address= updateaddress;
          students[index].snumber = updatesnumber;
          students[index].fnumber = updatefnumber;
          students[index].date = updatedate;
          students[index].degree = updatedegree;
          students[index].gender = updategender;
          students[index].username = updateusername;
          students[index].password = updatepassword;
  
  
          localStorage.setItem('students', JSON.stringify(students));
      }
    });
    const studentbill = students.find(student => student.username === student1);        
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


});