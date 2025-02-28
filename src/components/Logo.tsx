import { getAssetPath } from '../utils/paths';

export default function Logo() {
  return (
    <a href="/" className="logo">
      <img src={getAssetPath('/src/assets/Heart.png')} alt="logo" />
    </a>
  );
}
