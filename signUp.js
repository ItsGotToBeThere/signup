const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const signUpBTN = document.querySelector("#signUpBtn")

function handle(){
        const username = usernameInput.value;
        const password = passwordInput.value;
    
        const url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/signin/${username}/${password}`;
    
        var newTab = window.open(url, '_blank');
    
        let validity;
        let placesVisited;
        var interval = setInterval(function () {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        validity = response.value;
                        placesVisited = response.strings;
    
                        clearInterval(interval);
                        newTab.close();
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
