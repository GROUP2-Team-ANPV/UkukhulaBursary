export function StudentapplicationScript(){
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('applicationForm');
    
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
    
            const formData = new FormData(form);
    
            
            const jsonObject = {};
            formData.forEach((value, key) => {
                jsonObject[key] = value;
            });
    
            
            fetch('http://localhost:5263/api/UniversityAdmin/StudentFundRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify(jsonObject), 
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); 
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                
                console.log('Success:', data);
            })
            .catch(error => {
                
                console.error('Error:', error);
            });
        });
    });
    
}

