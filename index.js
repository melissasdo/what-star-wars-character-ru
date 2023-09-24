import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://swapi.dev/api/";

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs"); /* installing ejs */

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

function calcResult(batteryPercentage, year) {
  // Parse input values as numbers
  const parsedBatteryPercentage = parseFloat(batteryPercentage);
  const parsedYear = parseFloat(year);

  if (isNaN(parsedBatteryPercentage) || isNaN(parsedYear)) {
    // Handle cases where parsing fails (e.g., non-numeric input)
    return "Invalid input";
  }

  const randomNumber = Math.floor(Math.random() * 83) + 1;
  const resLess83 = parsedBatteryPercentage + parsedYear;

  if (resLess83 > 83) {
    return randomNumber;
  } else {
    return parsedBatteryPercentage + parsedYear;
  }
}

app.post("/your-results", async (req, res) => {
  const resCharacter = calcResult(req.body.batterypercentage, req.body.year);

  try {
    const result = await axios.get(API_URL + "people/" + resCharacter);
    res.render("your-results.ejs", {
      name: result.data.name,
      pfp: charactersImages[resCharacter],
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
    res.render("your-results.ejs", {
      content: JSON.stringify(error.response.data),
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const charactersImages = [
  "",
  "https://upload.wikimedia.org/wikipedia/pt/c/cf/LukeTatooine.jpg",
  "https://static.wikia.nocookie.net/starwars/images/a/a2/C-3PO-TROSTGG.png/revision/latest?cb=20230706042830",
  "https://static.wikia.nocookie.net/ptstarwars/images/1/1a/R2d2.jpg/revision/latest?cb=20060701231820",
  "https://static.wikia.nocookie.net/starwars/images/6/67/Darth_Vader_SWE_detail.png/revision/latest?cb=20221128024813",
  "https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg",
  "https://static.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png/revision/latest?cb=20171108050140",
  "https://static.wikia.nocookie.net/starwars/images/7/76/Beru_headshot2.jpg/revision/latest?cb=20111029215429",
  "https://static.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png/revision/latest?cb=20160809033145",
  "https://static.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png/revision/latest?cb=20130305010406",
  "https://static.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg/revision/latest?cb=20111115052816",
  "https://static.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png/revision/latest?cb=20130621175844",
  "https://static.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg/revision/latest?cb=20100620213033",
  "https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png/revision/latest?cb=20161108052810",
  "https://static.wikia.nocookie.net/starwars/images/0/01/Hansoloprofile.jpg/revision/latest?cb=20100129155042",
  "https://static.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg/revision/latest?cb=20180209034210",
  "https://static.wikia.nocookie.net/starwars/images/f/fe/Jabba_MMSWCA.png/revision/latest/scale-to-width-down/1200?cb=20230718014251",
  "",
  "https://static.wikia.nocookie.net/starwars/images/7/7e/WedgesEntireHead-ROTJ.png/revision/latest?cb=20200511024543",
  "https://static.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png/revision/latest?cb=20150920215118",
  "https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest/scale-to-width-down/1200?cb=20150206140125",
  "https://static.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png/revision/latest/thumbnail/width/360/height/360?cb=20130620100935",
  "https://static.wikia.nocookie.net/starwars/images/5/5e/BobaFettMain2.png/revision/latest?cb=20221003235522",
  "https://static.wikia.nocookie.net/starwars/images/f/fe/IG-88B-TESB40.png/revision/latest?cb=20211224193425",
  "https://static.wikia.nocookie.net/starwars/images/1/1d/Bossk.png/revision/latest?cb=20130219044712",
  "https://static.wikia.nocookie.net/starwars/images/7/7d/Lando_WoSW.jpg/revision/latest?cb=20080715214753",
  "https://static.wikia.nocookie.net/starwars/images/7/72/Lobot-SWE.png/revision/latest?cb=20211214014446",
  "https://static.wikia.nocookie.net/starwars/images/f/fb/Ackbar_HS.jpg/revision/latest?cb=20081118162020",
  "https://static.wikia.nocookie.net/starwars/images/4/46/Monmothma.jpg/revision/latest/thumbnail/width/360/height/360?cb=20070615234013",
  "https://static.wikia.nocookie.net/starwars/images/d/de/Arvel-crynyd.jpg/revision/latest?cb=20120113223349",
  "https://static.wikia.nocookie.net/starwars/images/4/4f/Wicket_RotJ.png/revision/latest/thumbnail/width/360/height/360?cb=20130622101905",
  "https://static.wikia.nocookie.net/starwars/images/4/46/NienNunbHS-SWE.png/revision/latest?cb=20211213023129",
  "https://static.wikia.nocookie.net/starwars/images/f/f6/Qui-Gon_Jinn_Headshot_TPM.jpg/revision/latest?cb=20180430174809",
  "https://static.wikia.nocookie.net/starwars/images/7/7c/NuteGunrayEpIII-SWCTP.png/revision/latest?cb=20230915122104",
  "https://static.wikia.nocookie.net/starwars/images/8/89/Valorum.jpg/revision/latest?cb=20080801152355",
  "https://static.wikia.nocookie.net/ptstarwars/images/b/b2/Padmegreenscrshot.jpg/revision/latest?cb=20100112010743",
  "https://static.wikia.nocookie.net/starwars/images/d/d2/Jar_Jar_aotc.jpg/revision/latest/thumbnail/width/360/height/360?cb=20080303052132",
  "https://static.wikia.nocookie.net/starwars/images/d/d5/TarpalsHS-SWE.png/revision/latest?cb=20211214030207",
  "https://static.wikia.nocookie.net/starwars/images/f/f0/Bossnass.png/revision/latest?cb=20221003235912",
  "https://static.wikia.nocookie.net/swfanon/images/9/9e/RicOlieClose.JPG/revision/latest/thumbnail/width/360/height/450?cb=20090419064029",
  "https://static.wikia.nocookie.net/starwars/images/e/eb/WattoHS.jpg/revision/latest/thumbnail/width/360/height/360?cb=20081222024729",
  "https://static.wikia.nocookie.net/starwars/images/4/44/Sebulba-SWISE2010.png/revision/latest/scale-to-width-down/1200?cb=20221013174835",
  "https://static.wikia.nocookie.net/starwars/images/7/72/PanakaHS-TPM.png/revision/latest?cb=20130126044005",
  "https://static.wikia.nocookie.net/starwars/images/6/6c/ShmiSkywalkerLars-Databank.jpg/revision/latest?cb=20171114023541",
  "https://static.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest?cb=20140209162228",
  "https://static.wikia.nocookie.net/ptstarwars/images/3/33/BibFortunaHS-ROTJ.png/revision/latest?cb=20170809032301",
  "https://static.wikia.nocookie.net/starwars/images/f/f9/Aayla.jpg/revision/latest?cb=20211226183259",
  "https://static.wikia.nocookie.net/starwars/images/8/87/MrsTyerell.jpg/revision/latest?cb=20070508133130",
  "https://static.wikia.nocookie.net/starwars/images/7/73/Dud_Bolt_Podracer_Cockpit.png/revision/latest?cb=20141214155313",
  "https://static.wikia.nocookie.net/starwars/images/a/a4/GasganoHS-SWE.png/revision/latest?cb=20211212055452",
  "https://static.wikia.nocookie.net/starwars/images/0/02/BenQuadinarosHS-SWE.png/revision/latest?cb=20191007192605",
  "https://static.wikia.nocookie.net/starwars/images/2/27/MaceWindu_-WoSW.png/revision/latest?cb=20220914013358",
  "https://static.wikia.nocookie.net/starwars/images/9/9e/KiAdiMundi.jpg/revision/latest?cb=20070930185700",
  "https://static.wikia.nocookie.net/starwars/images/2/25/KitFisto-USWNE.png/revision/latest?cb=20221202063304",
  "https://static.wikia.nocookie.net/starwars/images/b/b6/Eeth_Koth_profile.png/revision/latest?cb=20131103213648",
  "https://static.wikia.nocookie.net/starwars/images/f/f2/AdiGallia2-SWE.png/revision/latest?cb=20211211183231",
  "https://static.wikia.nocookie.net/starwars/images/a/a3/SaeseeTiin-SWCT.png/revision/latest?cb=20200807024726",
  "https://static.wikia.nocookie.net/starwars/images/b/b2/YaraelPoof-SWCT.png/revision/latest?cb=20211219001726",
  "https://static.wikia.nocookie.net/starwars/images/c/c4/Plo_Koon_TPM.png/revision/latest?cb=20130911190623",
  "https://static.wikia.nocookie.net/star-wars-legends/images/4/40/Mas_Amedda.jpg/revision/latest?cb=20150209222046",
  "https://static.wikia.nocookie.net/starwars/images/5/52/Gregar_Typho.jpg/revision/latest?cb=20090903192036",
  "https://static.wikia.nocookie.net/starwars/images/e/e5/Corde-SWCT.png/revision/latest?cb=20160713053607",
  "https://static.wikia.nocookie.net/starwars/images/3/36/ClieggLarsHS-SWE.jpg/revision/latest?cb=20180513065414",
  "https://static.wikia.nocookie.net/starwars/images/9/93/Poggle_the_lesser_-_sw_card_trader.png/revision/latest?cb=20160707212132",
  "https://static.wikia.nocookie.net/swfanon/images/e/e6/Luminara_Unduli.jpg/revision/latest?cb=20190506170517",
  "https://static.wikia.nocookie.net/starwars/images/a/a4/BarrissOffee-OP.png/revision/latest?cb=20211214033336",
  "https://static.wikia.nocookie.net/starwars/images/8/8a/Dorme-SWCT.png/revision/latest?cb=20230812011816",
  "https://static.wikia.nocookie.net/starwars/images/f/fa/DookuHS-SWILotS.png/revision/latest?cb=20190426043747",
  "https://static.wikia.nocookie.net/ptstarwars/images/5/50/Bail_Organa_Mug.jpg/revision/latest?cb=20100621171424",
  "https://static.wikia.nocookie.net/starwars/images/7/70/Jango_OP.jpg/revision/latest?cb=20071029210612",
  "https://static.wikia.nocookie.net/starwars/images/7/7d/Clawdite.jpg/revision/latest?cb=20180611093711",
  "https://static.wikia.nocookie.net/starwars/images/1/1c/DexterHS-SWE.png/revision/latest?cb=20220910154422",
  "https://static.wikia.nocookie.net/starwars/images/7/73/Lama_Su.jpg/revision/latest?cb=20080117165735",
  "https://static.wikia.nocookie.net/ptstarwars/images/4/43/Taun_We.jpg/revision/latest?cb=20110122043017",
  "https://static.wikia.nocookie.net/starwars/images/c/cf/Jocasta.jpg/revision/latest?cb=20090909113150",
  "https://static.wikia.nocookie.net/starwars/images/5/52/R4-P17_USWNE.png/revision/latest?cb=20221105232252",
  "https://static.wikia.nocookie.net/ptstarwars/images/3/30/Wat_Tambor.jpg/revision/latest?cb=20100219214917",
  "https://static.wikia.nocookie.net/starwars/images/6/63/SanHill-BaseSeries5.png/revision/latest?cb=20221007045541",
  "https://static.wikia.nocookie.net/ptstarwars/images/d/db/Shaak_Ti_Promo.jpg/revision/latest?cb=20090509230742",
  "https://static.wikia.nocookie.net/ptstarwars/images/d/de/Grievoushead.jpg/revision/latest?cb=20200709192001",
  "https://static.wikia.nocookie.net/starwars/images/d/d9/Tarfful-TSWB.png/revision/latest?cb=20201025195948",
  "https://static.wikia.nocookie.net/starwars/images/8/80/Raymus_card_trader.png/revision/latest?cb=20180922045037",
  "https://static.wikia.nocookie.net/starwars/images/b/b7/SlyMooreStare-OP.png/revision/latest?cb=20211214041804",
  "https://static.wikia.nocookie.net/starwars/images/1/16/TionMedon-SWI90.png/revision/latest?cb=20230915013119",
];
