import { useState, useEffect } from 'react';

export default function Footer() {
  const [deploymentInfo, setDeploymentInfo] = useState<{ timestamp?: string, repository?: string }>({});

  useEffect(() => {
    fetch('/deployment-info.txt')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const info = {
          timestamp: lines[0].split(': ')[1]?.trim(),
          repository: lines[1].split(': ')[1]?.trim()
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
          Last deployed: {new Date(deploymentInfo.timestamp).toLocaleDateString()} •
          Repository: {deploymentInfo.repository}
        </p>
      )}
    </footer>
  );
}
