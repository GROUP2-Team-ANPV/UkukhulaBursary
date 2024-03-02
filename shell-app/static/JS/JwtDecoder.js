
export function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
     const userdata = JSON.parse(jsonPayload)
     const userRole  = userdata["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      const usertimeStamp =userdata["exp"]
      const expirationDate = new Date(usertimeStamp * 1000);
      if (expirationDate.getMinutes ==0) {
        console.log("User session is don resign in")
        sessionStorage.clear();
         window.location.href = "/login";
      }
    return  userRole
}