import Carousel from "./Carousel"
import diddyKongRacing from "../images/diddyKongRacing.png"
import marioKart64 from "../images/marioKart64.png"
import marioParty from "../images/marioParty.png"
import minecraft from "../images/minecraft.png"
import smSixFour from "../images/sm64img.png"
import sonic from "../images/sonic.png"

function App() {

  let imgList = [
    {url: diddyKongRacing, title: "Diddy Kong Racing"},
    {url: marioKart64, title: "Mario Kart 64"},
    {url: marioParty, title: "Mario Party"},
    {url: minecraft, title: "Minecraft"}, 
    {url: smSixFour, title: "Super Mario 64"}, 
    {url: sonic, title: "Sonic"}]



  return (
    <div>
    <Carousel imgList = {imgList}/>
    </div>
  )
}

export default App
