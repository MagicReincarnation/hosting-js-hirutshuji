 let kodenumberAdmin = 22;
 let kodenumberStaff = 25;
 let kodenumberModder = 20;
 let kodenumberMember = 15;
 let kodenumberUser = 10;
 let kodenumberCoin = 5;

/* =========== encrypt ============ */
/* /*Admin*/
function encryptKontentAdmin (value1) {    
   let encryptedAdmin = '';
  for (let i = 0; i < value1.length; i++) {
  const encryptedCharAdmin = String.fromCharCode(value1.charCodeAt(i) + kodenumberAdmin);
  encryptedAdmin += encryptedCharAdmin;
   } return encryptedAdmin;
}   
       
    /*Modder*/
function encryptKontentModder (value2) {    
  let encryptedModder = '';
  for (let i = 0; i < value2.length; i++) {
  const encryptedCharModder = String.fromCharCode(value2.charCodeAt(i) + kodenumberModder);
  encryptedModder += encryptedCharModder;
   } return encryptedModder;
}    
  /*Staff*/
function encryptKontentStaff (value3) {    
  let encryptedStaff = '';
  for (let i = 0; i < value3.length; i++) {
  const encryptedCharStaff = String.fromCharCode(value3.charCodeAt(i) + kodenumberStaff);
  encryptedStaff += encryptedCharStaff;
   } return encryptedStaff;
}  
 
  /*Member*/
function encryptKontentMember(value4) {    
  let encryptedMember = '';
  for (let i = 0; i < value4.length; i++) {
  const encryptedCharMember = String.fromCharCode(value4.charCodeAt(i) + kodenumberMember);
  encryptedMember += encryptedCharMember;
   } return encryptedMember;
}    
/*User*/  
function encryptKontentUser(value5) {    
  let encryptedUser = '';
  for (let i = 0; i < value5.length; i++) {
  const encryptedCharUser = String.fromCharCode(value5.charCodeAt(i) + kodenumberUser);
  encryptedUser += encryptedCharUser;
   } return encryptedUser;
}    
/*Coin*/  
function encryptKontentCoin(value6) {    
  let encryptedCoin = '';
  for (let i = 0; i < value6.length; i++) {
  const encryptedCharCoin = String.fromCharCode(value6.charCodeAt(i) + kodenumberCoin);
  encryptedCoin += encryptedCharCoin;
   } return encryptedCoin;
}    

/* =========== Decrypt ============ */
/*========== ROLE ADMIN  =========*/
function openlockAdmin(encryptedAdmin) {
 encryptedAdmin = encryptedAdmin;       
  let decryptedAdmin = '';
  for (let i = 0; i < encryptedAdmin.length; i++) {
   const decryptedCharAdmin = String.fromCharCode(encryptedAdmin.charCodeAt(i) - kodenumberAdmin);
  decryptedAdmin += decryptedCharAdmin;
        }
return decryptedAdmin;
    }  
  
function unlockAdmin() {    
 let premiumKCAdmin = document.querySelectorAll('.premiumKTAdmin');
 if(premiumKCAdmin){
  premiumKCAdmin.forEach(premiumKLAdmin => { 
  const decryptCKAdmin = premiumKLAdmin.getAttribute('data-text');     
  const decryptedT0Admin = openlockAdmin(decryptCKAdmin);         
  premiumKLAdmin.innerHTML = decryptedT0Admin;     
  premiumKLAdmin.removeAttribute('data-text');  
notifBoxch();
   });
    }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
  }  
  
/*========== ROLE MODDER  =========*/
  
  function openlockModder(encryptedModder) {
 encryptedModder = encryptedModder;       
  let decryptedModder = '';
  for (let i = 0; i < encryptedModder.length; i++) {
   const decryptedCharModder = String.fromCharCode(encryptedModder.charCodeAt(i) - kodenumberModder);
            decryptedModder += decryptedCharModder;
        }return decryptedModder;
    }  
  
function unlockModder() {    
 
 let premiumKCModder = document.querySelectorAll('.premiumKTModder');
if(premiumKCModder){
  premiumKCModder.forEach(premiumKLModder => { 
  const decryptCKModder = premiumKLModder.getAttribute('data-text');     
  const decryptedT0Modder = openlockModder(decryptCKModder);         
  premiumKLModder.innerHTML = decryptedT0Modder;     
  premiumKLModder.removeAttribute('data-text');  
notifBoxch();
   });
    }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
  }  
  
/*========== ROLE STAFF  =========*/
  function openlockStaff(encryptedStaff) {
 encryptedStaff = encryptedStaff;       
  let decryptedStaff = '';
  for (let i = 0; i < encryptedStaff.length; i++) {
   const decryptedCharStaff = String.fromCharCode(encryptedStaff.charCodeAt(i) - kodenumberStaff);
            decryptedStaff += decryptedCharStaff;
        }return decryptedStaff;
    }  
  
function unlockStaff() {    
 
 let premiumKCStaff = document.querySelectorAll('.premiumKTStaff');
  if(premiumKCStaff){
  premiumKCStaff.forEach(premiumKLStaff => { 
  const decryptCKStaff = premiumKLStaff.getAttribute('data-text');     
  const decryptedT0Staff = openlockStaff(decryptCKStaff);         
  premiumKLStaff.innerHTML = decryptedT0Staff;     
  premiumKLStaff.removeAttribute('data-text');  
notifBoxch();
   });
    }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
  }  
  
 /*========== ROLE MEMBER  =========*/
  
  function openlockMember(encryptedMember) {
 encryptedMember = encryptedMember;      
  let decryptedMember = '';
  for (let i = 0; i < encryptedMember.length; i++) {
   const decryptedCharMember = String.fromCharCode(encryptedMember.charCodeAt(i) - kodenumberMember);
            decryptedMember += decryptedCharMember;
        }return decryptedMember;
    }  
  
function unlockMember() {    
 
 let premiumKCMember = document.querySelectorAll('.premiumKTMember');
  if(premiumKCMember){
  premiumKCMember.forEach(premiumKLMember => { 
  const decryptCKMember = premiumKLMember.getAttribute('data-text');     
  const decryptedT0Member = openlockMember(decryptCKMember);         
  premiumKLMember.innerHTML = decryptedT0Member;     
  premiumKLMember.removeAttribute('data-text');  
notifBoxch();
   });
    }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
  }  
  
/*  ========== ROLE USER  ========= */
  
  function openlockUser(encryptedUser) {
 encryptedUser = encryptedUser;       
  let decryptedUser = '';
  for (let i = 0; i < encryptedUser.length; i++) {
   const decryptedCharUser = String.fromCharCode(encryptedUser.charCodeAt(i) - kodenumberUser);
  decryptedUser += decryptedCharUser;
        }return decryptedUser;
    }  
  
function unlockUser() {    
 let premiumKCUser = document.querySelectorAll('.premiumKTUser');
  if(premiumKCUser){
  premiumKCUser.forEach(premiumKLUser => { 
  const decryptCKUser = premiumKLUser.getAttribute('data-text');     
  const decryptedT0User = openlockUser(decryptCKUser);         
  premiumKLUser.innerHTML = decryptedT0User;     
  premiumKLUser.removeAttribute('data-text');  
notifBoxch();
   });    
   }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
}  



function openlockCoin(encryptedCoin) {
 encryptedCoin = encryptedCoin;       
  let decryptedCoin = '';
  for (let i = 0; i < encryptedCoin.length; i++) {
   const decryptedCharCoin = String.fromCharCode(encryptedCoin.charCodeAt(i) - kodenumberCoin);
 decryptedCoin += decryptedCharCoin;
        }return decryptedCoin;
    }  
  
function unlockCoin() {    
 let premiumKCCoin = document.querySelectorAll('.premiumKTCoin');
 if(premiumKCCoin){
  premiumKCCoin.forEach(premiumKLCoin => { 
  const decryptCKCoin = premiumKLCoin.getAttribute('data-text');     
  const decryptedT0Coin = openlockCoin(decryptCKCoin);         
  premiumKLCoin.innerHTML = decryptedT0Coin;     
  premiumKLCoin.removeAttribute('data-text');  
notifBoxch();
   });    
   }else{
console.log("class PremiumKT.. tidak ditemukan");
  }
 }  
