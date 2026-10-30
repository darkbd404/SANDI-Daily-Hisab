import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../android-source/files';

export const generateAndDownloadAndroidZip = async (): Promise<boolean> => {
  try {
    const zip = new JSZip();

    // 1. Add all Android source and config files
    ANDROID_PROJECT_FILES.forEach((file) => {
      zip.file(file.path, file.content);
    });

    // 2. Add gradlew shell script
    const gradlewScript = `#!/bin/sh
# Gradle start up script for POSIX systems
APP_HOME=$(cd "$(dirname "$0")" && pwd)
exec "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" "$@" 2>/dev/null || gradle "$@"
`;
    zip.file('gradlew', gradlewScript);

    const gradlewBat = `@rem Gradle start up script for Windows
@echo off
set DIRNAME=%~dp0
gradle %*
`;
    zip.file('gradlew.bat', gradlewBat);

    // 3. Fetch original images and bundle them
    const imagesToFetch = [
      {
        url: '/public/assets/aistudio/sandi_vehicle_d117164c.jpg',
        targets: [
          'assets/vehicle/sandi_vehicle.jpg',
          'app/src/main/assets/vehicle/sandi_vehicle.jpg',
        ],
      },
      {
        url: '/public/assets/aistudio/abdus_salam_968dd59e.jpg',
        targets: [
          'assets/owner/abdus_salam.jpg',
          'app/src/main/assets/owner/abdus_salam.jpg',
        ],
      },
      {
        url: '/public/assets/aistudio/salam_signature_bce91b51.jpg',
        targets: [
          'assets/signature/salam_signature.jpg',
          'app/src/main/assets/signature/salam_signature.jpg',
        ],
      },
    ];

    for (const img of imagesToFetch) {
      try {
        const response = await fetch(img.url);
        if (response.ok) {
          const blob = await response.blob();
          const buffer = await blob.arrayBuffer();
          for (const target of img.targets) {
            zip.file(target, buffer);
          }
        }
      } catch (err) {
        console.warn(`Could not bundle image ${img.url}`, err);
      }
    }

    // 4. Generate the ZIP blob
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    // 5. Trigger download
    const downloadUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'SANDI-Daily-Hisab-Android-Source.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    return true;
  } catch (error) {
    console.error('Failed to generate Android ZIP:', error);
    return false;
  }
};
