
export default class AuthenticationService
{
    static IsLoggedIn()
    {
        console.log(sessionStorage.getItem('token'));
        return sessionStorage.getItem('token') && sessionStorage.getItem('token') !== '';
    }
    static Logout(returnUrl)
    {
        sessionStorage.setItem('token', '');
        if(returnUrl != null && returnUrl !== '')
        {
            window.location.href = returnUrl;
        }
    }
    static LogIn()
    {

        window.location.href = '/login';
    }
    static GetAuthToken()
    {
        return sessionStorage.getItem('token');
    }
}