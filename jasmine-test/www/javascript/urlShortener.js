
var longUrlText,shortURLText;

function convertShortURL(obj) {
  console.log("URL shortener is")
  longUrlText = "https://gist.github.com/marc-ed-raffalli/1cbb8638b2b7c959bf9f701e3fd0ccb1 ";
  var userEntry = obj.innerHTML;
  
  if (userEntry == " " || longUrlText == " ") {
    shortURLText.innerHTML ="Please provide valid url";
  } else if (userEntry == "CreateShortURL") {
    var shortURL = "shortId123";
    longUrlText.innerHTML = "http://localhost:3000/"+ shortURL;
  } 
}
