const SKY_EL = { num: 0, cssClass: "sky" };
const CLOUD_EL = { num: 1, cssClass: "cloud" };
const TRUNK_EL = { num: 5, cssClass: "trunk" };
const TREE_EL = { num: 6, cssClass: "tree" };
const STONE_EL = { num: 7, cssClass: "stone" };
const GRASS_EL = { num: 8, cssClass: "grass" };
const DIRT_EL = { num: 9, cssClass: "dirt" };

const pickaxe = { picableBlocks: [STONE_EL], num: 1 };
const shovel = { picableBlocks: [DIRT_EL, GRASS_EL], num: 2 };
const axe = { picableBlocks: [TREE_EL, TRUNK_EL], num: 3 };

let selectedTool;
let inventory = 0;

const initialMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
  [0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 7],
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];
const game = document.querySelector(".game-board");
const tools = document.querySelectorAll(".tool");

for (let row = 0; row < initialMatrix.length; row++) {
  for (let col = 0; col < initialMatrix.length; col++) {
    switch (initialMatrix[row][col]) {
      case 0:
        createElement(SKY_EL);
        break;
      case 1:
        createElement(CLOUD_EL);
        break;
      case 9:
        createElement(DIRT_EL);
        break;
      case 8:
        createElement(GRASS_EL);
        break;
      case 7:
        createElement(STONE_EL);
        break;
      case 6:
      case 4:
        createElement(TREE_EL);
        break;
      case 5:
        createElement(TRUNK_EL);
        break;
    }
  }
}
function createElement(type) {
  let gridDiv = document.createElement("div");
  gridDiv.classList.add(type.cssClass);
  gridDiv.setAttribute("data-matirial", type.num);
  game.appendChild(gridDiv);
  gridDiv.addEventListener("click", gridClick);
}

function gridClick(e) {
  const oldMatirial = e.target.dataset.matirial;
  if (!inventory) {
    switch (selectedTool) {
      case pickaxe:
        if (
          pickaxe.picableBlocks.some((pickableMatirial) => {
            return pickableMatirial.num == oldMatirial;
          })
        ) {
          inventory = getMatirialByCode(parseInt(e.target.dataset.matirial));
        }
        break;
      case shovel:
        if (
          shovel.picableBlocks.some((pickableMatirial) => {
            return pickableMatirial.num == oldMatirial;
          })
        ) {
          inventory = getMatirialByCode(parseInt(e.target.dataset.matirial));
        }
        break;
      case axe:
        if (
          axe.picableBlocks.some((pickableMatirial) => {
            return pickableMatirial.num == oldMatirial;
          })
        ) {
          inventory = getMatirialByCode(parseInt(e.target.dataset.matirial));
        }
        break;
    }
  } else {
    invertDiv(e.target, inventory);
  }
}

console.log(getMatirialByCode(inventory));
function invertDiv(oldBlock, newBlock) {
  if (newBlock) oldBlock.setAttribute("class", newBlock.cssClass);
  inventory = null;
}

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tool.classList.toggle("selected-tool");
    selectedTool = getToolByCode(parseInt(tool.dataset.tool));
    console.log(tool.dataset.tool);
    console.log(selectedTool);
    console.log(getToolByCode(1));
  });
});
function getMatirialByCode(num) {
  switch (num) {
    case 0:
      return SKY_EL;
    case 1:
      return CLOUD_EL;
    case 9:
      return DIRT_EL;
    case 8:
      return GRASS_EL;
    case 7:
      return STONE_EL;
    case 6:
    case 4:
      return TREE_EL;
    case 5:
      return TRUNK_EL;
  }
}

function getToolByCode(num) {
  switch (num) {
    case 1:
      return pickaxe;
    case 2:
      return shovel;
    case 3:
      return axe;
  }
}
