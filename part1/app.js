// 1
let favoriteNum = 7;
let URL = "http://numbersapi.com/";
let res = $.getJSON(URL + favoriteNum + "?json");

res.then((data) => console.log(data)).catch((err) => console.log(err));

// 2
let favoriteNumList = [1, 3, 5];
let res2 = $.getJSON(URL + favoriteNumList);
res2.then((data) => console.log(data)).catch((err) => console.log(err));

// 3
for (let i = 0; i < 4; i++) {
  let res = $.getJSON(URL + favoriteNum + "?json");
  res
    .then((data) => {
      console.log(data["text"]);
      $(".facts-div").append(`<p>${data["text"]}</p>`);
    })
    .catch((err) => console.log(err));
}
