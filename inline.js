function saveToL(){
	localStorage.priKey = document.getElementById('priKey').value;
	localStorage.pubKey = document.getElementById('pubKey').value;
	localStorage.pass = document.getElementById('pass').value;
	localStorage.isSymmetric = document.getElementById('isSymmetric').checked;
}
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('priKey').value = localStorage.priKey;
	document.getElementById('pubKey').value = localStorage.pubKey;
	document.getElementById('pass').value = localStorage.pass;
	document.getElementById('isSymmetric').checked = localStorage.isSymmetric=="true";
	document.querySelector('.button').addEventListener('click', saveToL);
});
//chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
//  console.log(response.status);
//});
