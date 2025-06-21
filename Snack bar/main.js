let toastbox=document.getElementById("toastbox");
let successmsg='<i class="fa-solid fa-circle-check"></i>Successfully submitted';
let errormsg='<i class="fa-solid fa-circle-xmark"></i></i>Error happed!';
let invalidmsg='<i class="fa-solid fa-circle-exclamation"></i>Invalid input, check again!';

function showToast(msg){
    let toast=document.createElement('div');
    toast.classList.add('toast');
    
    if(msg.includes('Error')){
        toast.classList.add('error');
    }
    
    if(msg.includes('Invalid')){
        toast.classList.add('invalid');
    }
    toast.innerHTML=msg;
    toastbox.appendChild(toast);
    setTimeout(()=>{
        toast.remove();
    },6000)
}