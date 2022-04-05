function GetDate() {
    const today = new Date();
    var hours = today.getHours();
    var apm;
    if (hours >= 12) {
        apm = "PM";
    }
    else {
        apm = "AM";
    }
 
    hours = hours % 12;
 
    if (hours === 0) {
        hours = 12;
    }
  
    var minutes = today.getMinutes();
  
     if (minutes < 10) {
        minutes = '0' + minutes
    }
  
    const current = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + 
     ', ' + hours + ':' + minutes + ':' + today.getSeconds() + ' ' + apm;
  
    return current;
 }  
 
 export default GetDate