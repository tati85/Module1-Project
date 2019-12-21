localStorage.setItem("asteroids", 1);
let radios = document.getElementsByName('mode');
radios.forEach(button => button.addEventListener('click', e => {
    localStorage.setItem('asteroids', e.target.value === 'easy' ? 1 : 9);
    console.log(e.target.value, localStorage.getItem('asteroids'))
}));

// document.getElementById("starLink").addEventListener("click", () => {
//     let asteroidsNumber;
//     let radioBtn = document.getElementsByName("mode");
//     // if (radioBtn[0].value === "easy")
//     //     (radioBtn[0].checked) ? asteroidsNumber = 1 : asteroidsNumber = 9;
//     // else if (radioBtn[0].checked)
//     //     asteroidsNumber = 9;
//     // else
//     //     asteroidsNumber = 1;

//     // localStorage.setItem("asteroids", asteroidsNumber);
// });