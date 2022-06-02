// define variables
var strings = [];
var string_limit = {
  string_size: null,
  string_wait: 200,
  string_cap: 100,
  delay: 5,
  text_size: 15,
};
var letters = [];
var xpos = [];
// characters used in strings
var characters =
  "アァカサタナハマヤャラワガザダバパピビヂジギヰリミヒニチシキィイウゥクスツヌフムユュルグズヅブプペベデゼゲヱレメヘネテセケェエオォコソトノホモヨョロヲゴゾドボポンッヴ";
// setup
function setup() {
  // set up functions
  createCanvas(750, 500);
  textAlign(CENTER);
  frameRate(30);
  textSize(string_limit.text_size);
  // define stuff
  string_limit.string_size = round(height / string_limit.text_size);
  for (let i = string_limit.text_size/2; i < width; i += string_limit.text_size) {
    xpos.push(i);
  }
  // make new string every string_limit.string_wait milliseconds
  setInterval(function () {
    makeString();
  }, string_limit.string_wait);
}
// draw/main loop
function draw() {
  // background
  background(0);
  // clear strings that are off screen
  strings = strings.filter((s) => {
    return s.text.length < string_limit.string_size-1
  });
  for (var string of strings) {
    // speed and delay
    string.y += string.speed;
    string.t++;
    // cycle through string
    if (string.i < string.string.length -1 &&
        string.t % string_limit.delay === 0) {
      string.i++;
      string.text += string.string[string.i];
    }
    // draw and fade
    fill(255);
    string.trans -= string_limit.delay / 2;
    text(string.string[string.i],string.x,string.y + string.i * string_limit.text_size);
    for (var i = 0; i < string.text.length; i++) {
      fill(0, 255, 0, i * 10 + string.trans);
      text(string.text[i], string.x, string.y + i * string_limit.text_size);
    }
  }
}
// function to make strings
function makeString() {
  // cap number of strings
  if (strings.length < string_limit.string_cap) {
    // create new string
    var new_string = {
      x: xpos[round(random(0, xpos.length - 1))],
      y: -200,
      speed: random(1, 5),
      string: " ",
      text: "",
      trans: 255,
      i: 0,
      t: 0,
    };
    // get rid of overlap and add string
    for (var i = 0; i < strings.length; i++) {
      while (
        new_string.string.length < string_limit.string_size ||
        new_string.x === strings[i].x
      ) {
        new_string.string +=
          characters[round(random(0, characters.length - 1))];
        new_string.x = xpos[round(random(0, xpos.length - 1))];
      }
    }
    // add to array
    strings.push(new_string);
  }
}
