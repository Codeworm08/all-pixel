
let isDrawing = false; // To keep drawing when mouse is held
let primaryColor = "black";
let currentColor = primaryColor
let erase = "white";
const createEditor = (width,height)=>{
    const container = document.getElementById("editor");
    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){
            const row = document.createElement("div");
            row.addEventListener("mousedown",()=>{
                isDrawing = true;
            })
            row.addEventListener("mousemove", ()=>{
                if(isDrawing){
                    row.style.backgroundColor = primaryColor;
                }
            })
            row.addEventListener("mouseup", ()=>{
                if(isDrawing)
                    isDrawing=false;
            })
            row.addEventListener("click",()=>{
                // When single cell is clicked instead of a mouse drag
                row.style.backgroundColor = primaryColor;
            })
            container.appendChild(row);

        }
    }    
}

const setColor = (color) => {
    primaryColor = color;
}
const pen = document.getElementById("pen");
const eraser =document.getElementById("eraser");

pen.addEventListener("click",()=>{
    setColor(currentColor);
})

eraser.addEventListener("click",()=>{
    setColor(erase);
})

createEditor(32,32);

const canvas = document.getElementById("pixelCanvas")
const ctx  = canvas.getContext("2d")
ctx.fillStyle = "rgb(200 0 0)";
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgb(0 0 200 / 50%)";
ctx.fillRect(30, 30, 50, 50);