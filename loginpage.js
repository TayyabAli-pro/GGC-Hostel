 
    const jumbo1 = document.getElementById('jumbo1')  
    const jumbo2 = document.getElementById('jumbo2')
    sessionStorage.setItem('logginas', "admin");
document.getElementById('loginas1').addEventListener('change', function() {
    const userType = this.value; 
    if (userType === "admin") {
        jumbo1.style.display = 'flex';
        jumbo2.style.display = 'none';
    }
    else if(userType === "student"){
        jumbo1.style.display = 'none';
        jumbo2.style.display = 'flex';
    }
    sessionStorage.setItem('logginas', userType);
  });
 
document.getElementById('loginas2').addEventListener('change', function() {
    const userType = this.value;
    if (userType === "student") {
        jumbo1.style.display = 'none';
        jumbo2.style.display = 'flex';
    }
    else if(userType === "admin"){
        jumbo1.style.display = 'flex';
        jumbo2.style.display = 'none';
        location.reload();
    }
    sessionStorage.setItem('logginas', userType);
  });  
document.getElementById('loginpage1').addEventListener("submit", (event)=>{
    event.preventDefault(); // Prevent default form submission
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
         
    var  loginas = (sessionStorage.getItem('logginas'))
    if(name === "admin" && password === "admin" && loginas === "admin"){
        window.location.href = 'admin.html'
    } else {
        alert('Invalid name or password');
    }
    
});

document.getElementById('loginpage2').addEventListener("submit", (event)=>{
    event.preventDefault(); // Prevent default form submission
    var name1 = document.getElementById('name1').value;
    var password1 = document.getElementById('password1').value;
    
    let students = JSON.parse(localStorage.getItem('students')) || [];  
    let student = students.find(student => student.username === name1 && student.password === password1);      
    console.log(student)
    var  loginas = (sessionStorage.getItem('logginas'))
    if (student && loginas === "student") {
        sessionStorage.setItem('loggedName', student.username);
        sessionStorage.setItem('loggedpassword', student.password);
        window.location.href = 'student.html'
    }else {
        alert('Invalid name or password');
    }
    loginpage2.reset()
    
});

