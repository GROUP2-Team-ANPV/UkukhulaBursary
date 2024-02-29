let currentIndex = 0;
   
      const studentId = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);

      fetch(`http://localhost:5263/api/BBDAdmin/GetBBDTotalAmount?Year=${year}`)
          .then(response => response.json())
          .then(data => {
            displayStudent(data)
          })
          .catch(error => {
              console.error('Error fetching application details:', error);
          });

      function displayStudent(data) {
          const student = data
          document.getElementById('Year').value = student.year;
          document.getElementById('funds__Balance').value = student.budget;
          document.getElementById('remaining').value = student.remainingBudget;
          document.getElementById('funded').value = student.uniNumber;
          
          
      }


      window.onload = function() {
        fetch('http://localhost:5263/api/UniversityAdmin/GetUniversityAmount')
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };
    
    function populateTable(data) {
        let tableBody = document.getElementById('UniversityTable');
        tableBody.innerHTML = ''; 
    
        data.forEach(university => {
            let row = tableBody.insertRow();

            row.insertCell().textContent = university.universityName;
            row.insertCell().textContent = university.amount;
            row.insertcell().textContent = count(university.universityName)

        });


    }
