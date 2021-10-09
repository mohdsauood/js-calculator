function val(result){
      form.disp.value = form.disp.value + result;
    }
    function calculate(){
    if(form.disp.value == ""){
      alert("Enter something");
    }
    else{
     form.disp.value = eval(form.disp.value);
    }
    }
    function clr(){ 
    document.getElementById('disp').value="";
    }
    document.getElementById("del").addEventListener("click", function() {
        var delte = form.disp.value;
         form.disp.value= delte.slice(0, delte.length-1);
    }); 