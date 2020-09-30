
var inputLabel;

function convertShortURL(obj) {
  console.log("URL shortener is")
  longUrlText = document.getElementById("longUrlText").innerHTML;
  var userEntry = obj.innerHTML;
  
  if (userEntry == " " || longUrlText == " ") {
    shortURLText.innerHTML ="Please provide valid url";
  } else if (userEntry == "CreateShortURL") {
    var shortURL = "shortId123";
    shortURLText.innerHTML = "http://localhost:3000/"+ shortURL;
  } 
}
