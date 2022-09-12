class Game {
    // class properties
    foundCircles = 0;
    totalCircles = 0;
    searchColor = "blue";
    normalColor = "red";
    gameZone = document.getElementById("gameZone");
    foundBar = new FoundBar();

    constructor() {
        // make the circles
        for (let i = 0; i < 25; i++) {
            // creating the svgs
            let newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            newCircle.classList.add("gameCircle");
            newCircle.setAttribute("cx", Math.random() * 400);
            newCircle.setAttribute("cy", Math.random() * 400);

            // randomly choose what reveal color the circle is
            if (Math.random() < 0.3) {
                newCircle.dataset.hiddenColor = this.searchColor;
                this.totalCircles++;
            } else {
                newCircle.dataset.hiddenColor = this.normalColor;
            }

            // mouse events
            // show the hidden color on mouseover
            newCircle.addEventListener("mouseover", (event) => {
                event.target.style.fill = event.target.dataset.hiddenColor;
            })

            // show black when mouseout
            newCircle.addEventListener("mouseout", (event) => {
                event.target.style.fill = 'black';
            })

            newCircle.addEventListener("click", (event) => {
                // if user cliks on the color he's looking for
                if (event.target.dataset.hiddenColor == this.searchColor) {
                    event.target.remove();

                    this.foundCircles++;
                    this.foundBar.setPercent(this.foundCircles / this.totalCircles);
                }
            })
            // add the circles to the screen
            this.gameZone.appendChild(newCircle);
        }
    }

}

class FoundBar {
    element = document.getElementById("foundBar");
    maxSize = 130;
    percent = 0;

    setPercent(percent) {
        this.percent = percent;
        this.element.setAttribute("width", this.percent * this.maxSize);

    }
}



let game = new Game();