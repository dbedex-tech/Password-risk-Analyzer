const passwordInput = document.getElementById('check-password');
passwordInput.addEventListener('input', () => {
  const val=passwordInput.value;
  const result = zxcvbn(val);
  const entropy = result.score;
document.querySelector('.font').textContent = entropy; 
let feedback = ""
if (result.score === 0) {
  console.log(feedback = "Password Strength: CRITICALLY WEAK ----- CHANGE IMMEDIATELY!!!"
  )
} else if (result.score === 1) {
  console.log(feedback = "Password Strength: WEAK ----- CHANGE IT NOW!!")
} else if (result.score === 2) {
  console.log(feedback = "Password Strength: FAIR ----- TRY ANOTHER ONE!");
} else if (result.score === 3) {
  console.log(feedback = "Password Strength: SAFE ----- SECURE IT MORE");
} else if (result.score === 4) {
  console.log(feedback = "Password Strength: SUPER-SAFE ----- HIGHLY RECOMMENDED")
}
console.log(entropy);
console.log(feedback)
document.querySelector('.font').textContent = `${feedback}`
});

