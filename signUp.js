const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const signUpBTN = document.querySelector("#signUpBtn")

function handle(){
        const username = usernameInput.value;
        const password = passwordInput.value;
    
        const url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/addUser/${username}/${password}`;
    
        var newTab = window.open(url, '_blank');
    
        let validity;
        var interval = setInterval(function () {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        validity = JSON.parse(xhr.responseText);
                        


                        if (validity === true) {
                            localStorage.setItem('placesVisited', JSON.stringify(placesVisited));
                            localStorage.setItem('isLoggedIn', JSON.stringify(true));
                            localStorage.setItem('username',username)
                            window.location.href = 'https://wahoowanderings.co';
                        }

                        setTimeout(function() {
                        newTab.close();
                        }, 2000);
                    }
                }
            };
            xhr.send();
        }, 200);
    }


    
document.addEventListener('keypress',function(event){
    if (event.key==='Enter') handle()
})



signUpBTN.addEventListener('click',handle)
