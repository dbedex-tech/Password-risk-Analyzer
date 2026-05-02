/*Password Strength Analyzer & Breach Checker
A web app where users test their passwords for strength and check if they appear in known data breach databases — using the HaveIBeenPwned API and real entropy calculations.
password security
breach data
REST API
JavaScript
HaveIBeenPwned API
HTML/CSS/JS
HIDE DETAILS ↑
SKILLS YOU’LL LEARN
SECURITY ANALYST
Password entropy concepts, credential stuffing attacks, k-anonymity model used in safe API calls, common breach patterns
DEVELOPER
Fetching external APIs with fetch(), SHA-1 hashing in-browser, building reactive UI, input sanitization, async/await
BUILD STEPS
01
Build static HTML form with password input and results panel
02
Write a JS function to score entropy (length, charset variety, patterns)
03
Implement SHA-1 hash of password, send first 5 chars to HIBP API
04
Parse API response to count breach matches (k-anonymity model)
05
Design a color-coded strength meter and breach result display
06
Add recommendations panel (e.g. “Add symbols”, “Use a passphrase”)
07
Deploy to GitHub Pages
REAL-WORLD USE CASE
IT teams use tools like this during security awareness training to show employees exactly why weak passwords are dangerous — with real breach evidence, not just theory.
BONUS FEATURES
Passphrase generator that creates strong memorable passwords
Email breach checker (check if an email appeared in known breaches)
History of checked passwords stored locally (hashed only)
I’m going with this. explain the role of the analyst critically.*/

/*add entropy, zxcvbn using cloudfare*/

//score 0 .... red
//score 1.....orange
//score 2......yellow
//score 3......blue
//score 4......green

//Working on zxcvbn 

const passwordInput=document.getElementById('check-password');
const testBtn = document.getElementById('test-btn');

testBtn.addEventListener('click', () =>{
const val = passwordInput.value;

let bar = document.querySelector('.bar');
let boxShadowColor = document.querySelector('.pop-up')
if (!val) {
  document.getElementById('guesses').textContent = "Type in a Password to Proceed";
  bar.style.width = "0%"
  boxShadowColor.style.setProperty("--box-glow", "#EDF600")
  return

}
const result = zxcvbn(val);
const score = result.score;
const entropy = Math.log2(result.guesses)
let feedback = ""
if (score === 0 && entropy < 40) {//reject 
  feedback = " This Password is too easy to guess. Please create a completely different password"
} else if (score === 0 && entropy >= 40 && entropy <= 60) {//reject 
  feedback = " This Password looks a bit complex, but it follows a pattern attackers already know. Try something more unique and less predictable."
} else if (score === 0 && entropy >= 60 && entropy <= 80) { //Weak
  feedback = " This Password looks a bit complex, but it follows a pattern attackers already know. Try something more unique and less predictable. "
} else if (score === 0 && entropy > 80) {//fair
  feedback = " This password is long, but parts of it are still predictable. You can improve it by making it more unique or using a passphrase.";
} else if (score === 1 && entropy < 40) {//reject 
  feedback = " This Password is too simple and easy to guess. Try making it longer and less obvious.";
} else if (score === 1 && entropy >= 40 && entropy <= 60) {//Weak
  feedback =" This Password could be guessed with common techniques. Try adding more length or unpredictability."
} else if (score === 1 && entropy >= 60 && entropy <= 80) {//fair
feedback = "You're getting there, but this password still has predictable patterns. Try mixing unrelated words or making it longer."
} else if (score === 1 && entropy > 80) {//moderate 
  feedback = " This password is fairly strong, but a bit of randomness will make it safer."
} else if (score === 2 && entropy < 40) {//reject 
  feedback = " This password is too short to be secure. Please make it longer or more unique."
} else if (score === 2 && entropy >= 40 && entropy <= 60) {//fair
  feedback = " This Password is okay, but it could be stronger. Consider making it less predictable."
} else if (score === 2 && entropy >= 60 && entropy <= 80) {//moderate 
  feedback = " This is a decent Password, but improving its uniqueness or length will make it stronger. "
} else if (score === 2 && entropy > 80) {//strong 
  feedback = "Great Job! This  Password is strong. For even better security, you could make it slightly more unpredictable"
} else if (score === 3 && entropy < 40) {//weak
  feedback = " This Password has great structure, but it's too short to be secure. Try making it longer."
} else if (score === 3 && entropy >= 40 && entropy <= 60) {//moderate 
  feedback = " This is a solid Password, but increasing its length will make it even safer."
} else if (score === 3 && entropy >= 60 && entropy <= 80) {//strong 
  feedback = " Strong Password. Hard to guess and reasonably secure."
} else if (score === 3 && entropy > 80) {//Very Strong 
  feedback = " Excellent Password! It's highly Secure and difficult to crack."
} else if (score === 4 && entropy < 40) { //fair
  feedback = " This Password is Clever, but a bit short. Making it longer will improve its security."
} else if (score === 4 && entropy >= 40 && entropy <= 60) { //strong 
  feedback = " Strong Password! It's well structured and not easy to guess."
} else if (score === 4 && entropy >= 60 && entropy <= 80) { //Very Strong 
  feedback = " Very Strong Password! Great balance of length and unpredictability."
} else if (score === 4 && entropy > 80) { //Excellent 
  feedback = " Outstanding Password! This is extremely secure and very resistant to attack."
}
console.log(score);
console.log(feedback);
console.log(entropy);
document.getElementById('guesses').textContent = `${feedback}`

document.getElementById('feedback-modal').showModal()
//document.getElementById('entropy').textContent = `Entropy Status: ${entropy}`
  
  let width = "0";
  let backgroundColor = "";
  let boxShadow = ""
  if (entropy < 40) {
    width = "20%";
    backgroundColor = "red"
    boxShadow = 'red'
  } else if (entropy >= 40 && entropy <= 60) {
    width = "40%";
    backgroundColor = "orange"
  } else if (entropy >= 60 && entropy <= 80) {
    width = "60%";
    backgroundColor = "yellow"
  } else if (entropy >= 80 && entropy <= 100) {
    width = "80%";
    backgroundColor = "blue"
  } else if (entropy > 100) {
    width = "100%";
    backgroundColor = "green"
  }
bar.style.width = width
bar.style.backgroundColor = backgroundColor;
boxShadowColor.style.setProperty("--box-glow", backgroundColor)
});
//console.log(width);
//console.log(color);
/*async function sha1(val) {
const encoder = new TextEncoder()
const data = encoder.encode(val)
const hashBuffer = await
crypto.subtle.digest("SHA-1", data)

}console.log(data)*/
