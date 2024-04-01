let deckId;
let $gimmeBtn = $(".gimme-btn");

function getRandomAngle() {
  const num = Math.random();

  const randomAngle = num * 61 - 30;

  return randomAngle;
}
function getRandomPosition() {
  const p1 = Math.floor(Math.random() * 21 - 10);
  const p2 = Math.floor(Math.random() * 21 - 10);
  return [p1, p2];
}

let getIdFromDefaultDeck = function () {
  res = $.getJSON(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  res
    .then((data) => {
      deckId = data["deck_id"];
    })
    .catch((err) => console.log(err));
};
getIdFromDefaultDeck();

let drawACard = function () {
  // to prevent the user clicking too fast
  $gimmeBtn.prop("disabled", true);
  $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((card) => {
      if (card["remaining"] === 0) {
        $gimmeBtn.remove();
      }
      console.log(card);
      console.log(
        `${card["cards"][0]["value"]} of ${card["cards"][0]["suit"]}`
      );
      const randomAngle = getRandomAngle();
      const [p1, p2] = getRandomPosition();
      $(".cards-div").append(
        `<img class="rotated" src="${card["cards"][0]["image"]}" alt="card" style="transform: rotate(${randomAngle}deg); left: ${p1}px; right: ${p2}px">`
      );
      // to prevent the user clicking too fast
      $gimmeBtn.prop("disabled", false);
    })
    .catch((err) => console.log(err));
};

$gimmeBtn.on("click", drawACard);
