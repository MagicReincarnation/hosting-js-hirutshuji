let role1 = sistemRole.role1;
let role2 = sistemRole.role2;
let role3 = sistemRole.role3;
let role4 = sistemRole.role4;
let role5 = sistemRole.role5;
let memberCoin = sistemRole.coinMember;
let notifunlock = sistemRole.notifUnlock;
let notifcheckrole = sistemRole.notifcheckrole;

let letkontentsudahdibeli = sistemRole.notifcheckrole2;

function roleSistemCoin(){             
  if(memberCoin) {   
  unlockMember();    
  unlockCoin();
  notifBoxch();    
  }else{
  unlockCoin();
  notifBoxch();     
  }     
}

function checkMembershipExp() {
    const userId = auth.currentUser.uid;
    db.collection("users").doc(userId).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            const expRoleText = userData.exp;                
            if (expRoleText) {
                const dateParts = expRoleText.split(', ');
                if (dateParts.length === 2) {
                    const dateString = dateParts[0];
                    const timeZone = dateParts[1];
                    const parts = dateString.split('/');
                    if (parts.length === 3) {
                        const day = parseInt(parts[0], 10);
                        const month = parseInt(parts[1], 10) - 1;
                        const year = parseInt(parts[2], 10);
                        const expRoleDate = new Date(year, month, day);
                        if (!isNaN(expRoleDate.getTime())) {
                            const currentDate = new Date();
                            if (currentDate >= expRoleDate) {
                              Swal.fire({
                                        icon: 'warning',
                                       title:LogCode.MembershipHabis.judul,
                                       text:LogCode.MembershipHabis.pesan,    allowOutsideClick: false,             confirmButtonText:LogCode.MembershipHabis.ya                                  }).then(() => {                       db.collection("users").doc(userId).update({                                  role: role5,                          
exp: "?"                               
}).then(() => {
}).catch(error => {                   console.error("Gagal mengubah Role user:", error);
});
 });

                            }
                        }
                    }
                }
            }
        } else {
            console.log("data user tidak ditemukan!");
        }
    }).catch(error => {
        console.error("Gagal mengambil data user:", error);
    });
}


function openCoin() {
  if (auth.currentUser) {
    let dataCoin = auth.currentUser.uid;
    const kontenId = document.getElementById("syarat-coin");
    if (kontenId) {
      const idPostCoin = kontenId.getAttribute("idpostcoin");
      const historyRef = dbrl.ref('Datapembelianuser/' + dataCoin + '/' + idPostCoin);   
      historyRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
  letkontentsudahdibeli = true;
          Swal.fire({
            icon: 'info',
            title: LogCode.kontentSudahdibeli.judul,
            text: LogCode.kontentSudahdibeli.pesan,
            allowOutsideClick: false,
            confirmButtonText: LogCode.kontentSudahdibeli.ya
          });
          roleSistemCoin();
        }
      }).catch((error) => {
        console.error("Error dalam pengecekan data:", error);
      });
    }else{
   console.log("bukan kontent Coin");
   }
  }
}

const buttonsCoin = document.querySelectorAll(".Btn_coin");
if (buttonsCoin){  
buttonsCoin.forEach(bc => {
  bc.addEventListener("click", function() {  checkDomainBeforeAuthlisensiConfig((isAllowed) => {
  if (!isAllowed) {
    return;
  } else {
    if (!auth.currentUser) {
      Swal.fire({
        icon: 'error',
        title:LogCode.coinLogin.judul,
        text:LogCode.coinLogin.pesan,
        allowOutsideClick: false,
confirmButtonText:LogCode.coinLogin.ya
      });
      return; // Stop execution if user is not logged in
    }
    const classbc = this.className.split(" ");
    let encryptedCoinbc = null;
    classbc.forEach(classNamebc => {
      if (classNamebc.startsWith("sc-")) {
        encryptedCoinbc = classNamebc.substring("sc-".length);
      }
    });

    if (encryptedCoinbc) {
      const decryptedValuebc = atob(encryptedCoinbc);
      const matchesbc = decryptedValuebc.match(/\d+/);
      if (matchesbc && matchesbc.length > 0) {
        const syaratCoinbc = parseInt(matchesbc[0]);
        CoinValidator.checkCoinBalance(syaratCoinbc);
      } else {
        console.error("Tidak dapat menemukan coin yang didekripsi.");
      }
    } else {
      console.error("Tidak dapat menemukan coin yang dienkripsi");
    }
  });
/*lisensi*/    
  } 
});
/*lisensi*/
});

const CoinValidator = (function() {
function checkCoinBalance(syaratCoin) {
  if (auth.currentUser) {
    let dataCoin = auth.currentUser.uid;
    const coinRef = db.collection('users').doc(dataCoin);
    coinRef.get().then((doc) => {
      if (doc.exists) {
        let coins = doc.data().coin;
        let emailCoin = doc.data().email; 
        Swal.fire({
          icon: 'question',
          title: LogCode.konfimasiPembelian.judul,
text:`${LogCode.konfimasiPembelian.pesan} ${syaratCoin} ${LogCode.konfimasiPembelian.pesan2}`,
showCancelButton: true,      confirmButtonText:LogCode.konfimasiPembelian.ya,
cancelButtonText: LogCode.konfimasiPembelian.tidak,
allowOutsideClick: false,
reverseButtons: false
        }).then((result) => {
          if (result.isConfirmed) {
            if (!isNaN(coins) && coins >= syaratCoin) {
              const kontenId = document.getElementById("syarat-coin").getAttribute("idpostcoin");
              const judulKonten = document.getElementById("syarat-coin").getAttribute("titlecoin");
              const urlKonten = document.getElementById("syarat-coin").getAttribute("posturlcoin");

              const historyRef = dbrl.ref('Datapembelianuser/' + dataCoin + '/' + kontenId);    
              historyRef.once('value').then((snapshot) => { 
                if (snapshot.exists()) {    
                  Swal.fire({
                    icon: 'info',
title:LogCode.punyaAkses.judul,
text:LogCode.punyaAkses.pesan,
allowOutsideClick: false,
confirmButtonText:LogCode.punyaAkses.ya
                  }).then(() => {
               roleSistemCoin();
                  });
                } else {
                  const pembelianRef = dbrl.ref('Datapembelianuser/' + dataCoin + '/' + kontenId);

                  pembelianRef.set({
                    Email: emailCoin, // Menggunakan email yang diambil dari Firestore
                    judul: judulKonten,
                    url: urlKonten,                       
                    koin_digunakan: syaratCoin,
                    sisa_koin: coins - syaratCoin
                  }).then(() => {
                    coinRef.update({ coin: coins - syaratCoin }); // Mengupdate nilai koin di Firestore
                    Swal.fire({
                      icon: 'success',
                   title:LogCode.pembelianBerhasil.judul, text:`${LogCode.pembelianBerhasil.pesan} ${syaratCoin} ${LogCode.pembelianBerhasil.pesan2} ${(coins - syaratCoin)} `,
 allowOutsideClick: false,
confirmButtonText:LogCode.pembelianBerhasil.ya
                    }).then(() => {       
          roleSistemCoin();
                    });
                  }).catch((e) => {                       
                    console.error("Gagal menyimpan riwayat pembelian:", e);
                  });
                }
              });
            } else {
              Swal.fire({
                icon: 'error',                 title:LogCode.coinTidakcukup.judul,
text:LogCode.coinTidakcukup.pesan,
allowOutsideClick: false,
confirmButtonText:LogCode.coinTidakcukup.ya
              });
            }
          } else {
            Swal.fire({
              icon: 'info',           title:LogCode.batalMembukakontent.judul,
text:LogCode.batalMembukakontent.pesan,
allowOutsideClick: false,
confirmButtonText:LogCode.batalMembukakontent.ya
            });
          }
        });
      } else {
        console.error("data user tidak ditemukan di database");
      }
    }).catch((error) => {
      console.error("Error mengambil data user:", error);
    });
  }
}
return {checkCoinBalance: checkCoinBalance};
})();
  }else {
console.log("script tidak bekerja karena class Btn_coin tidak ditemukan ");
 }

function checkUserRole(userId) {       
db.collection("users").doc(userId).onSnapshot(doc => {
        if (doc.exists) {
       let s = doc.data().role;
        if (role1 === s) {
            checkMembershipExp();
            unlockAdmin();
            unlockModder();
            unlockStaff();
            unlockMember();
            unlockUser();
      console.log(`Role ${role1}`);
          } else if (role2 === s) {
            checkMembershipExp();
            unlockModder();
            unlockStaff();
            unlockMember();
            unlockUser();
      console.log(`Role ${role2}`); 
           } else if (role3 === s) {
            checkMembershipExp();
            unlockModder();
            unlockMember();
            unlockUser();
       console.log(`Role ${role3}`);
          } else if (role4 === s) {
            checkMembershipExp();
            unlockMember();
            unlockUser();
       console.log(`Role ${role4}`);
          } else if (role5 === s) {
            checkMembershipExp();
            unlockUser();
       console.log(`Role ${role5}`);
          }
        }
      });
}

function checkKesamaanrole(userIdx){
  if(notifcheckrole && letkontentsudahdibeli){
db.collection("users").doc(userIdx).get().then((doc) => {
    if (doc.exists) {
    let scheck = doc.data().role;
    let datarolecheck = document.querySelector('.datarole').getAttribute('data-role');
    let checkrole = true;
if (datarolecheck && checkrole && datarolecheck !== scheck) {
   Swal.fire({
icon: 'info',
title: LogCode.roleTidaksama.judul,
text: LogCode.roleTidaksama.pesan,
allowOutsideClick: false,          
confirmButtonText: LogCode.roleTidaksama.ya
        });
        checkrole = false;
        console.log(`Role kamu (${scheck}) tidak sesuai dengan Role dari kontent Role (${datarolecheck}).`);  
letkontentsudahdibeli = false; 
    }  
    } else {
console.log("Tidak ada data role!");
    }
}).catch((error) => {
    console.log("Error Mengambil data:", error);
  });
  }else {console.log("notif checkrole sama atau tidak, notif itu dimatikan");}
}

function runCheck(){
auth.onAuthStateChanged(user => {
  if (user && user.emailVerified) {
  openCoin();
  checkUserRole(user.uid);    
  checkKesamaanrole(user.uid);
  } else {
     }
   });
 }
 runCheck();

function showSweetAlertlisensiConfig(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK'
    });
}

function checkDomainBeforeAuthlisensiConfig(callback) {
  // URL database
  const databaseURLlisensiConfig = 'https://xhrji-617c0-default-rtdb.firebaseio.com/akses_KodeLogin.json';

  // Dapatkan domain saat ini dari alamat URL
  const currentDomainlisensiConfig = window.location.hostname;

  // Ambil daftar domain yang diizinkan dari database menggunakan Fetch API
  fetch(databaseURLlisensiConfig)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(allowedDomainsObjectlisensiConfig => {
      // Loop melalui setiap domain yang diizinkan
      for (const domainIdlisensiConfig in allowedDomainsObjectlisensiConfig) {
        const domainDatalisensiConfig = allowedDomainsObjectlisensiConfig[domainIdlisensiConfig];
        const domainNamelisensiConfig = domainDatalisensiConfig.name;
        const domainwebDashboardlisensiConfig = domainDatalisensiConfig.webDashboard;
        
        // Periksa apakah domain saat ini termasuk dalam daftar domain yang diizinkan
        if (domainNamelisensiConfig === currentDomainlisensiConfig|| domainwebDashboardlisensiConfig=== currentDomainlisensiConfig) {
          return callback(true); // Panggil callback dengan nilai true
        }
      }

      // Jika domain tidak ditemukan, panggil callback dengan nilai false
      showSweetAlertlisensiConfig(lisensiConfig.ijinLogin.judul, lisensiConfig.ijinLogin.pesan, 'warning');
      callback(false);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}


function notifBoxch(){
  let notifunlockx=notifunlock;
  if(notifunlockx){
  const achievementCircle = document.querySelector('#achievement .circle-coin');
  const acbox = document.querySelector('.achievement-popup');
  const achievementElement= document.querySelector('#achievement');
  const achievementCopy = document.querySelector('#achievement .copy');


let notifch = document.querySelectorAll(".notifchapter");

 if (notifch) {
   notifch.forEach(e => {
  e.classList.add("hidden");
        });
   }

 if (achievementCircle) {
achievementCircle.classList.remove('rotate');
    acbox.classList.remove('hideac');

    setTimeout(function () {
      achievementElement.classList.add('expand');

      setTimeout(function () {
        achievementElement.classList.add('widen');

        setTimeout(function () {
          achievementCopy.classList.add('show-achievement');
        }, 1000);

      }, 1000);

    }, 1000);
  } else {
 console.log('notif stop');
  }

  setTimeout(function () {
    hideCoin();
  }, 5000);
  }
}  

function hideCoin(){
  let notifunlockx=notifunlock;
  if(notifunlockx){
  const achievementCircle = document.querySelector('#achievement .circle-coin');
  const acBox = document.querySelector('.achievement-popup');
  const achievementElement = document.querySelector('#achievement');
  const achievementCopy = document.querySelector('#achievement .copy');

  setTimeout(function () {    
    achievementCopy.classList.remove('show-achievement');
    setTimeout(function () {
      achievementElement.classList.remove('widen');
      achievementCircle.classList.add('rotate');

      setTimeout(function () {
        achievementElement.classList.remove('expand');
      }, 1000);

    }, 1000);

  }, 3000);

  setTimeout(function () {
    acBox.classList.add('hideac');
  }, 5000); 
  }
}
