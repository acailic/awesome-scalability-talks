import { getAssetPath } from '../utils/paths';

export default function Logo() {
  return (
    <a href="awesome-scalability-talks/" className="logo">
      <img src={getAssetPath('/src/assets/Skull.png')} alt="logo" />
    </a>
  );
}
