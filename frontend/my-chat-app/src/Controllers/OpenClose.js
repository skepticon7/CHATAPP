const CloseBtn = document.getElementById("CloseBtn");
const LoginBtn = document.getElementById("LoginBtn");
const HeroContainer =document.getElementById("hero-container");
const NavbarContainer =document.getElementById("navbar-container");
const LoginContainer = document.getElementById("login-container");
const SignupContainer = document.getElementById("signup-container");
console.log(LoginBtn);

const NavbarLogin = ()=>{
    LoginBtn.addEventListener("click",()=>{
        HeroContainer.classList.add(".blur");
        LoginContainer.classList.remove(".hidden");
    });

}

export default NavbarLogin;


