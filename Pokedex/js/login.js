window.onload = init;
function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function (){
            window.location.href = "signin.html";
        });

        document.querySelector('.btn-primary').addEventListener('click', login);

    }else{
        window.location.href = "pokedex.html";
    }
    
}

function login(){
    var axios_mail = document.getElementById('input-mail').value;
    var axios_pass = document.getElementById('input-password').value;
    //console.log(mail, pass);

    //axios esta ya en el html 
    axios({
        method:'post',
        url:'http://localhost:3000/user/login',
        data:{
            mail: axios_mail,
            password: axios_pass
        }
    }).then(function(res){
        //checa la respuesta
        //console.log(res.data);
        if (res.data.code == 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "pokedex.html"
        }else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}