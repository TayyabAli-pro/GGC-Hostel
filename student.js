var  loginas = (sessionStorage.getItem('logginas'))
var a = document.getElementById('body')
if (loginas === "student") {
   a.style.display = 'grid'
}
else{
  a.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
    let  username = (sessionStorage.getItem('loggedName'))
    let  password = (sessionStorage.getItem('loggedpassword'))
    let students = JSON.parse(localStorage.getItem('students')) || [];  
    
    const student = students.find(student => student.username === username && student.password === password); 
      
   displayStudentInfo(student) 

    function displayStudentInfo(student) {
        document.getElementById('infoName').textContent = student.sname;
        document.getElementById('infoFname').textContent = student.fname;
        document.getElementById('infoRollno').textContent = student.rollno;
        document.getElementById('infoRoom').textContent = student.room;
        document.getElementById('infoScnic').textContent = student.scnic;
        document.getElementById('infoFcnic').textContent = student.fcnic;
        document.getElementById('infoSnumber').textContent = student.snumber;
        document.getElementById('infoFnumber').textContent = student.fnumber;
        document.getElementById('infoAddress').textContent = student.address;
        document.getElementById('infoSession').textContent = student.date;
        document.getElementById('infoDegree').textContent = student.degree;
        document.getElementById('infoGender').textContent = student.gender;
    }
    const studentbill = students.find(student => student.username === username);        
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