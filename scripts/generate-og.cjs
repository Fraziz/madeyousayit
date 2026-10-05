const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const cardBackPath = path.resolve('public/cards/back design.png');
const cardBackData = fs.readFileSync(cardBackPath).toString('base64');
const cardBackDataUri = `data:image/png;base64,${cardBackData}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OG Image Generator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Outfit:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #f8fafc;
    }
    .container {
      position: relative;
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, #ffffff 0%, #f4f6fa 100%);
      overflow: hidden;
    }
    /* Authentic subtle dotted grid */
    .grid {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(15, 23, 42, 0.12) 1.5px, transparent 1.5px);
      background-size: 28px 28px;
      pointer-events: none;
    }
    /* Soft ambient blue glow behind the cards */
    .glow {
      position: absolute;
      width: 650px;
      height: 420px;
      background: radial-gradient(circle, rgba(81, 112, 255, 0.14) 0%, rgba(81, 112, 255, 0) 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -55%);
      filter: blur(40px);
      pointer-events: none;
    }
    .stage {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: -15px;
    }
    /* Card fan container */
    .card-fan {
      position: relative;
      width: 580px;
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      position: absolute;
      width: 250px;
      height: 350px;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.24), 0 0 0 1px rgba(15, 23, 42, 0.08);
      transform-origin: 50% 115%;
      background: #5170FF;
    }
    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 18px;
    }
    /* Fanned card positions matching Image 2 */
    .card-1 {
      transform: translateX(-140px) translateY(18px) rotate(-18deg);
      z-index: 10;
      opacity: 0.95;
    }
    .card-2 {
      transform: translateX(-70px) translateY(8px) rotate(-9deg);
      z-index: 20;
      opacity: 0.98;
    }
    .card-3 {
      /* Hero Center Card - Elevated, slightly tilted */
      transform: translateX(0px) translateY(-14px) rotate(2deg) scale(1.05);
      z-index: 40;
      box-shadow: 0 24px 48px -10px rgba(15, 23, 42, 0.32), 0 0 0 1px rgba(15, 23, 42, 0.08);
    }
    .card-4 {
      transform: translateX(70px) translateY(8px) rotate(11deg);
      z-index: 30;
      opacity: 0.98;
    }
    .card-5 {
      transform: translateX(140px) translateY(20px) rotate(20deg);
      z-index: 15;
      opacity: 0.95;
    }

    /* Flip badge pill */
    .flip-pill {
      margin-top: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 24px;
      border-radius: 9999px;
      background: #ffffff;
      border: 2px solid #5170FF;
      color: #5170FF;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(81, 112, 255, 0.12);
    }

    /* Categories row */
    .categories-row {
      margin-top: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cat-pill {
      padding: 7px 18px;
      border-radius: 9999px;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      color: #334155;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
    }
    .cat-pill.active {
      background: #5170FF;
      border-color: #5170FF;
      color: #ffffff;
      box-shadow: 0 3px 10px rgba(81, 112, 255, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="grid"></div>
    <div class="glow"></div>
    
    <div class="stage">
      <div class="card-fan">
        <!-- Card 1 -->
        <div class="card card-1">
          <img src="${cardBackDataUri}" alt="Card Back">
        </div>
        <!-- Card 2 -->
        <div class="card card-2">
          <img src="${cardBackDataUri}" alt="Card Back">
        </div>
        <!-- Card 3 (Elevated Hero Card) -->
        <div class="card card-3">
          <img src="${cardBackDataUri}" alt="Card Back">
        </div>
        <!-- Card 4 -->
        <div class="card card-4">
          <img src="${cardBackDataUri}" alt="Card Back">
        </div>
        <!-- Card 5 -->
        <div class="card card-5">
          <img src="${cardBackDataUri}" alt="Card Back">
        </div>
      </div>

      <div class="flip-pill">
        CLICK A CARD TO FLIP
      </div>

      <div class="categories-row">
        <div class="cat-pill">GUESS</div>
        <div class="cat-pill active">BATTLE</div>
        <div class="cat-pill">CREATE</div>
        <div class="cat-pill">CHAOS</div>
        <div class="cat-pill">CONNECT</div>
        <div class="cat-pill">LOVE</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const tempHtmlPath = path.resolve('scripts/og-cards-temp.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

const edge = 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';
const outPng = path.resolve('public/brand/og-cards.png');

console.log('Rendering OG image via Edge headless...');
execFileSync(edge, [
  '--headless',
  '--disable-gpu',
  '--window-size=1200,630',
  '--force-device-scale-factor=1',
  '--hide-scrollbars',
  '--screenshot=' + outPng,
  tempHtmlPath
]);

console.log('Finished rendering! Exists:', fs.existsSync(outPng));
if (fs.existsSync(outPng)) {
  console.log('Size (bytes):', fs.statSync(outPng).size);
}
