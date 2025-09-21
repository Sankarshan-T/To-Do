// // Initialize
// window.onload = () => {
//     displayCanvases();
// };

// Open the note popup
function canvaspopup() {

    const canvaspopup = document.createElement("div");
   


    canvaspopup.innerHTML = `
        <div id="canvaspopup">
            <div class="draw-cont">
                <section class="tools-board">
                    <div class="toolrow">
                        <label class="toolTitle">Shapes</label>
                        <ul class="options">
                            <li class="option tool" id="rectangle"> 
                                <img class="shapesicons" src="imgs/square.svg"></img>
                                <span>Rectangle</span>
                            </li>

                            <li class="option tool" id="circle"> 
                                <img class="shapesicons" src="imgs/circle.svg"></img>
                                <span>Circle</span>
                            </li>

                            <li class="option tool" id="triangle"> 
                                <img class="shapesicons" src="imgs/triangle.svg"></img>
                                <span>Triangle</span>
                            </li>

                            <li class="option">
                                <input type="checkbox" id="fill-color">
                                <label for="fill-color">Fill color</label>
                            </li>
                        </ul>
                    </div>

                    <div class="toolrow">
                        <label class="toolTitle">Options</label>
                        <ul class="options">
                            <li class="option active tool" id="brush">
                                <i class="fa-solid fa-brush"></i>
                                <span>Brush</span>
                            </li>

                            <li class="option tool" id="eraser">
                                <i class="fa-solid fa-eraser"></i>
                                <span>Eraser</span>
                            </li>

                            <li class="option">
                                <input type="range" id="size-slider">
                            </li>
                        </ul>
                    </div>

                    <div class="toolrow colorsrow">
                        <label class="toolTitle">Colors</label>
                        <ul class="options">
                            <li class="option"></li>
                            <li class="option selected"></li>
                            <li class="option"></li>
                            <li class="option"></li>
                            <li class="option">
                                <input type="color" id="color-picker" value="#b235ff">
                            </li>
                        </ul>
                    </div>

                    <div class="toolrow buttonsrow">
                        <button class="clear-canvas">Clear Canvas</button>
                        <button class="save-img">Save Canvas</button>
                        <button class="close-canvas" onclick="closeCanvasPopup()">Close Canvas</button>
                    </div>
                </section>
                <section class="drawing-board">
                    <canvas></canvas>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(canvaspopup);

    const canvas = document.querySelector("canvas"),
    toolbtns = document.querySelectorAll(".tool"),
    fillColorCeckbox = canvaspopup.querySelector("#fill-color"),
    sizeSlider = canvaspopup.querySelector("#size-slider"),
    colorBtns = canvaspopup.querySelectorAll(".colorsrow .option"),
    colorPicker = canvaspopup.querySelector("#color-picker"),
    clearCanvasBtn = canvaspopup.querySelector(".clear-canvas"),
    saveImgBtn = canvaspopup.querySelector(".save-img"),
    ctx = canvas.getContext("2d");
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "#ffd6ed";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "red",
    prevMouseX, prevMouseY,
    snapshot;

    ctx.fillStyle = selectedColor;
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushWidth;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const startDraw = (e) => {
        isDrawing = true;
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        ctx.beginPath();
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = selectedTool === "eraser" ? "#ffd6ed" : selectedColor;
        ctx.fillStyle = selectedColor;
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    const drawRect = (e) => {
        const width = e.offsetX - prevMouseX;
        const height = e.offsetY - prevMouseY;
        fillColorCeckbox.checked ? ctx.fillRect(prevMouseX, prevMouseY, width, height)
                                 : ctx.strokeRect(prevMouseX, prevMouseY, width, height);
    }

    const drawCircle = (e) => {
        const radius = Math.sqrt(Math.pow(e.offsetX - prevMouseX, 2) + Math.pow(e.offsetY - prevMouseY, 2));
        ctx.beginPath();
        ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
        fillColorCeckbox.checked ? ctx.fill() : ctx.stroke();
    }

    const drawTriangle = (e) => {
        ctx.beginPath();
        ctx.moveTo(prevMouseX, prevMouseY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
        ctx.closePath();
        fillColorCeckbox.checked ? ctx.fill() : ctx.stroke();
    }

    const drawing = (e) => {
        if(!isDrawing) return;

        ctx.putImageData(snapshot, 0, 0);

        if(selectedTool === "brush" || selectedTool === "eraser"){
            ctx.strokeStyle = selectedTool === "eraser" ? "#ffd6ed" : selectedColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (selectedTool === "rectangle") {
            drawRect(e);
        } else if (selectedTool === "circle") {
            drawCircle(e);
        } else if (selectedTool === "triangle") {
            drawTriangle(e);
        }
    }


    toolbtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active")
            selectedTool = btn.id;
        });
    });

    sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            canvaspopup.querySelector(".colorsrow .selected")?.classList.remove("selected");
            btn.classList.add("selected");
            const bgColor = window.getComputedStyle(btn).backgroundColor;
            selectedColor = bgColor;
        });
    });

    colorPicker.addEventListener("change", () => {
        selectedColor = colorPicker.value;
        colorBtns.forEach(btn => btn.classList.remove("selected"));
    });

    clearCanvasBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffd6ed";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    saveImgBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `canvas-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    })

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => isDrawing = false);

}


function closeCanvasPopup() {
    const canvaspopup = document.getElementById("canvaspopup");
    if (canvaspopup) canvaspopup.remove();
}   