let isDrawing = false; // To keep drawing when mouse is held
const colors = ["red","black","green","blue","yellow","violet","pink"]; // Color palette

let undoStack = [];



let primaryColor = "black";
let currentColor = primaryColor
let erase = "white";


const editorEvents = (grid,width,height)=>{
    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){
            const cell = document.getElementById(`cell (${width},${height})`);
            cell.addEventListener("mousedown",(e)=>{
                e.preventDefault();
                isDrawing = true;
            })
            cell.addEventListener("mousemove", (e)=>{
                console.log("Mouse button pressed: ",e.button);
                if(isDrawing && e.button == 0){
                    cell.style.backgroundColor = primaryColor; // paint on left button click;
                }
                else if(isDrawing && e.button == 2){
                    cell.style.backgroundColor = erase; //erase on right mouse click;
                }
            })
            cell.addEventListener("mouseup", ()=>{
                if(isDrawing)
                    isDrawing=false;
            })
            cell.addEventListener("click",(e)=>{
                // When single cell is clicked instead of a mouse drag
                if(e.button == 0){
                    cell.style.backgroundColor = primaryColor; // paint on left button click;
                }
                else if(e.button == 2){
                    cell.style.backgroundColor = erase; //erase on right mouse click;
                }
                // cell.style.backgroundColor = primaryColor;
            })
            cell.addEventListener("mouseover", () => {
                // show primary color when mouse hovers over cell
                if(!isDrawing && cell.style.backgroundColor === erase){
                    cell.dataset.hover = true;
                    cell.style.backgroundColor = primaryColor;
                }
            })
            cell.addEventListener("mouseleave", () => {
                // set cell back to white after hover if no color was painted on pixel
                if(cell.dataset.hover){
                    cell.style.backgroundColor = erase;
                    delete cell.dataset.hover;
                }
            })
        }
    }
}

const createEditor = (width,height)=>{
    const container = document.getElementById("editor");
    const grid = new Array(width).fill(erase).map(()=> new Array(height).fill(erase));
    console.log("Grid: ",grid)

    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){
            const cell = document.createElement("div");
            cell.id = `cell (${width},${height})`;                        
            container.appendChild(cell);
        }
    }
}

const createPalette = ()=>{
    const palette = document.getElementById("palette");
    for(let i=0;i<colors.length;i++){
        const colorCell = document.createElement("div");
        colorCell.style.backgroundColor = colors[i];
        colorCell.addEventListener("click",(e) => {
            if(e.button == 0){
                primaryColor = colorCell.style.backgroundColor;
                console.log("Primary color set to: ",primaryColor)
            }
            if(e.button == 2){                
                erase = colorCell.style.backgroundColor;
                console.log("Erase color set to: ",erase)
            }
        })
        palette.appendChild(colorCell);
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

createEditor(8,8);
createPalette();

const canvas = document.getElementById("pixelCanvas")
const ctx  = canvas.getContext("2d")
ctx.fillStyle = "rgb(200 0 0)";
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgb(0 0 200 / 50%)";
ctx.fillRect(30, 30, 50, 50);