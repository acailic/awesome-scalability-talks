import { getImageUrl } from '../utils/assetUtils';

function ImageExample() {
  // Use the helper for importing images
  const heartImg = getImageUrl('Heart.png');
  const coinImg = getImageUrl('Coin.png');
  const starImg = getImageUrl('Star.png');

  return (
    <div>
      <img src={heartImg} alt="Heart" />
      <img src={coinImg} alt="Coin" />
      <img src={starImg} alt="Star" />
    </div>
  );
}
