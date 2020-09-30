beforeEach(function () {
    createShortURL = "<button id='createShortURL'>createShortURL</button>";
    document.body.insertAdjacentHTML("afterbegin", createShortURL);
    longURLText ="<table><tr><td id='longURLText'>https://gist.github.com/marc-ed-raffalli/1cbb8638b2b7c959bf9f701e3fd0ccb1 </td></tr></table>";
    document.body.insertAdjacentHTML("afterbegin", longURLText);
    shortURLText = "<table><tr><td id='shortURLText'>http://localhost:3000/shortId123</td></tr></table>";
    document.body.insertAdjacentHTML("afterbegin", shortURLText);
    
});

describe("To Check User entered URL is not empty", function () {
  beforeEach(function () {
    errText = "<table><tr><td id='errText'>Please provide Valid URL</td></tr></table>";
    document.body.insertAdjacentHTML("afterbegin", errText);
  });

  it("Should check the user entered text is not blank", function () {
   
    document.getElementById("longURLText").innerHTML ="";
    expect(document.getElementById("createShortURL").innerHTML).toEqual("createShortURL");
    convertShortURL("createShortURL");
    expect(document.getElementById('errText').innerHTML).toEqual("Please provide Valid URL");
  });
});


describe("To Check the basic function of the URL shortener", function () {
  it("Should convert the LongURL text to short URL text", function () {
   
    document.getElementById("longURLText").innerHTML ="https://gist.github.com/marc-ed-raffalli/1cbb8638b2b7c959bf9f701e3fd0ccb1 ";
    expect(document.getElementById("createShortURL").innerHTML).toEqual("createShortURL");
    convertShortURL("createShortURL");
    expect(document.getElementById("shortURLText").innerHTML).toEqual("http://localhost:3000/shortId123");
  });

});
