import { useState, useEffect } from 'react';
import { getAssetPath } from '../../utils/paths';

export default function Footer() {
  const [deploymentInfo, setDeploymentInfo] = useState<{ 
    timestamp?: string, 
    repository?: string,
    deployedAt?: string,
    version?: string 
  }>({});

  useEffect(() => {
    fetch(getAssetPath('/deployment-info.txt')) // Use the utility to get the correct path
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const info = {
          timestamp: lines[0].split(': ')[1]?.trim(),
          repository: lines[1].split(': ')[1]?.trim(),
          deployedAt: lines[2].split(': ')[1]?.trim(),
          version: lines[3].split(': ')[1]?.trim()
        };
        setDeploymentInfo(info);
      })
      .catch(() => console.log('Deployment info not available'));
  }, []);

  return (
    <footer className="footer">
      <p>© 2023 Cozy React Learning Hub. All rights reserved.</p>
      <p>Built with React, TypeScript, and lots of ❤️</p>
      {deploymentInfo.timestamp && (
        <p className="deployment-info">
          Last deployed: {isValidDate(deploymentInfo.timestamp)
            ? new Date(deploymentInfo.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Invalid date format'} •
          <a href={deploymentInfo.repository} target="_blank" rel="noopener noreferrer">Repository</a> •
          {deploymentInfo.version && <span>Version: {deploymentInfo.version}</span>}
        </p>
      )}
    </footer>
  );
}

function isValidDate(dateString: string) {
  return !isNaN(Date.parse(dateString));
}
