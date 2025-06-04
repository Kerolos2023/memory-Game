document.querySelector(".control-buttons span").onclick = function(){
  let yourName = prompt("whats your name?");
  if(yourName == "" || yourName == null){
    document.querySelector(".name span").innerHTML = "Unknown";
  }
  else{
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove()
}


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());


for (let i = 0; i < orderRange.length; i++) {
  let randomIndex = Math.floor(Math.random() * orderRange.length);
  [orderRange[i], orderRange[randomIndex]] = [orderRange[randomIndex], orderRange[i]];
}
blocks.forEach((block,index)=>{
  block.style.order = orderRange[index];
  block.addEventListener("click",function(){
  flipBlock(block);
  })
})



function flipBlock(selectedBlock){
  selectedBlock.classList.add('is-flipped');
  let allFlippedBlocks = blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-flipped'));
  if(allFlippedBlocks.length % 2 ==0){
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}


function stopClicking(){
  blocksContainer.classList.add('no-clicking');
  setTimeout(()=>{
    blocksContainer.classList.remove("no-clicking");
  },duration)
}


function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector('.tries span');
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, duration);
  }

}








