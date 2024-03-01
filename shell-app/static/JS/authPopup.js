
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount () {
    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts  || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        sessionStorage.setItem('username', username);
    }
}

async function handleResponse(response) {
    if (response !== null) {
        const username = response.account.username;
        sessionStorage.setItem("username", response.account.username);
        sessionStorage.setItem("name", response.account.name)
        sessionStorage.setItem("accessToken", response.accessToken)
        const data = { email: username }; 
        console.log(response);
        console.log(data);

        try {
            const res = await fetch(`http://localhost:5263/api/Auth/Login?email=${data.email.toLowerCase()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.message);
            }

            const result = await res.json();
            sessionStorage.setItem('token', result.message);
            window.location.href = '/';
        } catch (error) {
            console.error('There was a problem logging in:', error.message);
        }
    } else {
        selectAccount();
    }
}

const signInBtn = document.getElementById('signIn');

signInBtn.addEventListener('click', () => {

    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });
    }); 

    function signOut() {

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        mainWindowRedirectUri: 'http://localhost:5000/signout',
        redirectUri: 'http://localhost:5000/login',
    };

    myMSALObj.logoutPopup(logoutRequest);
}

selectAccount();
