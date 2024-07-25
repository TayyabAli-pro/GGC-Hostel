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
    const remainingBillElement = document.getElementById('remainingBill');
    const currentBillElement = document.getElementById('currentBill');
    const totalBillElement = document.getElementById('totalBill');
    const sendBillForm = document.getElementById('sendBillForm');
    const sentPaymentsList = document.getElementById('sentPaymentsList');
    
    const studentIndex = students.findIndex(student => student.username === student1);
  
    if (studentIndex !== -1) {
        const studentData = students[studentIndex];
        const { previousBill, currentBill, sentPayments = [] } = studentData;

        remainingBillElement.textContent = previousBill || 0;
        currentBillElement.textContent = currentBill || 0;
        totalBillElement.textContent = (previousBill || 0) + (currentBill || 0);

        function displaySentPayments() {
            sentPaymentsList.innerHTML = '';
            sentPayments.forEach(payment => {
                const listItem = document.createElement('li');
                listItem.textContent = `Amount : ${payment.amount} , Status : ${payment.status}`;
                sentPaymentsList.appendChild(listItem);
            });
        }

        displaySentPayments();

        sendBillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('sendAmount').value);
            const totalBill = (previousBill || 0) + (currentBill || 0);

            if (amount > totalBill) {
                alert('You cannot pay more than the total bill.');
            } else {
                sentPayments.push({ amount, status: 'pending' });
                studentData.sentPayments = sentPayments;
                localStorage.setItem('students', JSON.stringify(students));
                displaySentPayments();
                document.getElementById('sendAmount').value = '';
            }
        });
        }
        
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
});


  