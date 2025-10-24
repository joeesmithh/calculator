const keypad = document.getElementById("keypad");

keypad.addEventListener("click", (e) => {
    const target = e.target;

    if(target instanceof Element){

        target.classList.forEach((s) => {
            switch (s) {
                case "operator":
                    break;
                case "show":
                    console.log(target.innerHTML);
                    break;
                default:
                    break;
            }
        });
    }
});
