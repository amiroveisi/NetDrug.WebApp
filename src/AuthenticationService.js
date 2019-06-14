
export default class AuthenticationService
{
    constructor(props)
    {

    }
    static IsLoggedIn()
    {
        return sessionStorage.getItem('token') != '';
    }
    static Logout(returnUrl)
    {
        sessionStorage.setItem('token', '');
        if(returnUrl != null && returnUrl != '')
        {
            window.location.href = returnUrl;
        }
    }
    static LogIn()
    {

        window.location.href = '/login';
    }
}