const totalRooms = 24; // Total number of rooms

// Add Student Form
document.getElementById('studentform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var sname = document.getElementById('sname').value;
    var fname = document.getElementById('fname').value;
    var scnic= document.getElementById('scnic').value;
    var fcnic = document.getElementById('fcnic').value;
    var rollno = document.getElementById('rollno').value;
    var room = document.getElementById('room').value;
    var address = document.getElementById('address').value;
    var snumber = document.getElementById('snumber').value;
    var fnumber = document.getElementById('fnumber').value;
    var date = document.getElementById('date').value;
    var degree = document.getElementById('degree').value;
    var gender = document.getElementById('gender').value;        
    var username = document.getElementById('username').value;        
    var password = document.getElementById('password').value;        
    if (sname&&fname&&scnic&&fcnic&&rollno&&room&&address&&snumber&&fnumber&&date&&gender&&degree&&username&&password&& isValidRoom(room) && isValidAccess(username)&& isValidAccess2(password)){ // Check if all fields are provided
            var student = {
                sname: sname,
                fname: fname,
                scnic: scnic,
                fcnic: fcnic,
                rollno: rollno,
                room: room,
                address: address,
                snumber: snumber,
                fnumber: fnumber,
                date: date,
                degree: degree,
                gender: gender,
                currentBill: 0, 
                previousBill: 0, 
                paidBill: 0,
                username : username,
                password : password
            };
            if (isRoomFull(room)) {
                alert("Room is full. Maximum capacity reached.");
                return;
            }
            let students = JSON.parse(localStorage.getItem('students')) || []; // Get existing students or initialize empty array
            students.push(student); // Add new student to array
            localStorage.setItem('students', JSON.stringify(students)); // Store students in local storage
                // Clear form fields
                studentform.reset();
                window.location.href = 'loginpage.html'
                // Clear file input
        } else {
            alert('Please Enter Valid Room Number.');
        } 
});

function isValidRoom(room) {
    return room >= 1 && room <= totalRooms;
}

function isRoomFull(room) {
    if (localStorage.getItem("students")) {
        const students = JSON.parse(localStorage.getItem("students"));
        const studentsInRoom = students.filter(student => student.room === room);
        return studentsInRoom.length >= 2;
    }
    return false;
}
function isValidAccess(username) {
    const students =JSON.parse(localStorage.getItem("students"));
    if (students) {
        var user = students.find(student => student.username === username)
    }
    if (user) {
        alert("username already exists")
        return false;
        }
        else{
            return true;
    }
}
function isValidAccess2(password) {
    const students =JSON.parse(localStorage.getItem("students"));
    if (students) {
        
        var pass = students.find(student => student.password === password)
    }
    if (pass) {
        alert("password already exists")
        return false;
        }
        else{
            return true;
    }
}