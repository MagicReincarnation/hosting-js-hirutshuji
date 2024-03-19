function clickPopupProduk() {
 var ktbuy = document.getElementById("ktbuy");
  if (ktbuy.classList.contains("hiddenBuy")) {
    ktbuy.classList.remove("hiddenBuy");
    ktbuy.classList.add("visibleBuy");
  } else {
    ktbuy.classList.remove("visibleBuy");
    ktbuy.classList.add("hiddenBuy");
  }
}
function runCariuid(){
document.querySelectorAll('.headerProduk').forEach(function(e) {
  var containerID = e.getAttribute('data-uidproduk');  
  var htmlContent = `
<img id="thumbailProduk"  src="${produk[containerID].gambarproduk.url}"/>
     <div class="headerProduk one"> 
       <label for="namaProduk">Produk:</label>
       <span data-title-produk="${produk[containerID].produk.nama}" id="namaProduk">${produk[containerID].produk.nama}</span>
       <div class="headerharga"> 
         <label for="hargaProduk">Harga:</label>
         <span data-harga-produk="Rp${produk[containerID].harga.Rp}/$${produk[containerID].harga.dollar}" id="hargaProduk">
           <p class="rupiah">${produk[containerID].harga.Rp}</p>/
           <p class="dolar">${produk[containerID].harga.dollar}</p>
         </span>
     </div>
   </div>`;
e.outerHTML = htmlContent;
   });
}

function beliProduk(uid) {
    var ddtuid = uid;
    var modalHtml = `
    <div class="ccpopup_frmProduk hiddenBuy" id="ktbuy" data-ccproduk="${ddtuid}">
    <div class="listProduk">
     <div class="closepopup_produk">
        <button class="closeBuy" onclick="clickPopupProduk()">Close Produk</button>
        </div>
     <div class="ovf_frmProduk">   
     <form id="frmProduk">
<div class="headerProduk" data-uidproduk="${ddtuid}"> 
            </div>      
            <div class="metodeViabuy">
                <label id="pilihmetodePembayaran">Pilih Metode Pembayaran:</label>
                <div class="metodePembayaran">
                    <div>
                        <input type="radio" id="Id_Gopay" name="metodePembayaran" value="Gopay"/>
                        <label for="Id_Gopay">Gopay</label>
                    </div>
                    <div>
                        <input type="radio" id="id_Dana" name="metodePembayaran" value="Dana"/>
                        <label for="id_Dana">Dana</label>
                    </div>
                    <div>
                        <input type="radio" id="Id_Paypal" name="metodePembayaran" value="Paypal"/>
                        <label for="Id_Paypal">Paypal</label>
                    </div>
                    <div>
                        <input type="radio" id="Id_Trakteer" name="metodePembayaran" value="Trakteer"/>
                        <label for="Id_Trakteer">Trakteer</label>
                    </div>
                </div>
            </div>

            <div class="metodeViabuy">
                <label for="notes">Catatan Tambahan:</label>
                <textarea id="catatatanPembeli" name="catatatanPembeli"></textarea>
            </div>
            <div class="metodeViabuy">
                <label id="pilihmetodePesan">Pilih Metode via:</label>
                <div class="metodePesanan" id="opsipembayaran">
                    <input type="radio" id="whatsappMethod" name="deliveryMethod" value="WhatsApp"/>
                    <label for="whatsappMethod">WhatsApp</label>
                    <input type="radio" id="emailMethod" name="deliveryMethod" value="Email">
                    <label for="emailMethod"/>Email</label>
                </div>
            </div>  

            <span class="syrtx">
            <input type="checkbox" id="kebijakan" name="kebijakan"/><span class="ruleKebijakan">Saya sudah membaca,Mengerti, dan Setuju dengan <a class="syrt" href="#">syarat dan ketentuan</a> (wajib)</span>
            </span>
            
            <button id="kirimPesanan" type="button" onclick="pesananProduk()" disabled>Beli Produk</button>
        </form>
        </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    runCariuid();
    runKebijakan();
}

function runKebijakan(){
document.querySelector('#kebijakan').addEventListener("change", function() {
  var kebijakanChecked = this.checked;
  var kirimPesanan = document.querySelector("#kirimPesanan");
  
  if (kebijakanChecked) {
    kirimPesanan.removeAttribute("disabled");
  } else {
    kirimPesanan.setAttribute("disabled", "disabled");
  }
  });
}

function pesananProduk() {
  var kebijakanChecked = document.getElementById("kebijakan").checked;
  if (kebijakanChecked) {
    var productName = document.getElementById("namaProduk").getAttribute("data-title-produk");
    var productImage = document.getElementById("thumbailProduk").getAttribute("src");
    var paymentMethod = document.querySelector('input[name="metodePembayaran"]:checked').value;
    var notes = document.getElementById("catatatanPembeli").value;
    var opsiMetode = document.querySelector('input[name="deliveryMethod"]:checked').value;
    // Membuat pesan yang akan dikirim berisi informasi formulir
    var message = "";

    // Format pesan sesuai metode pengiriman yang dipilih
    if (opsiMetode === "WhatsApp") {
      message = "*Saya ingin membeli ini:*\n\n" +
                "-------------------------------------\n\n" +
                "Nama Produk: *" + productName + "*\n\n" +
                "Thumbnail Produk: " + productImage + "\n\n" +
                "Metode Pembayaran: *" + paymentMethod + "*\n\n" +
                "Catatan Tambahan:\n\n" + notes + "\n\n" +
                "-------------------------------------";
    } else if (opsiMetode === "Email") {
      var subject = "Pesanan " + productName; 
      message = "Saya ingin membeli ini:\n\n" +
                "-------------------------------------\n\n" +
                "Nama Produk: " + productName + "\n\n" + 
                "Thumbnail Produk: " + productImage + "\n\n" +
                "Metode Pembayaran: " + paymentMethod + "\n\n" +
                "Catatan Tambahan:\n\n" + notes + "\n\n" +
                "-------------------------------------";
    }

    var linkRedirect = "";
    var gmailmu= gmailKamu;
    var nomormu =nomorKamu;
    if (opsiMetode === "WhatsApp") {
      linkRedirect = `https://wa.me/${nomormu}?text=` + encodeURIComponent(message);
    } else if (opsiMetode === "Email") {
      linkRedirect = `mailto:${gmailmu}?subject=` + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
      window.open(linkRedirect);
    }
   window.open(linkRedirect);
  }
}
