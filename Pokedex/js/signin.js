window.onload = init;
function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function (){
            window.location.href = "login.html";
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);  
    }else{
        window.location.href = "pokedex.html";
    }
}

function signin(){
    var axios_mail = document.getElementById('input-mail').value;
    var axios_pass = document.getElementById('input-password').value;
    var axios_name = document.getElementById('input-name').value;

    axios({
        method:'post',
        url:'http://localhost:3000/user/signin',
        data:{
            mail: axios_mail,
            password: axios_pass,
            name: axios_name
        }
    }).then(function(res){
        //checa la respuesta
        console.log(res.data);
        alert("Registro exitoso");
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })
}