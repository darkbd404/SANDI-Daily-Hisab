import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../android-source/files';

export const generateAndDownloadAndroidZip = async (): Promise<boolean> => {
  try {
    const zip = new JSZip();

    // 1. Add all Android source and config files
    ANDROID_PROJECT_FILES.forEach((file) => {
      zip.file(file.path, file.content);
    });

    // 2. Add gradlew shell script (portable for Linux/Mac/GitHub Actions)
    const gradlewScript = `#!/bin/sh
# Gradle start up script
if command -v gradle >/dev/null 2>&1; then
    exec gradle "$@"
fi
APP_HOME=$(cd "$(dirname "$0")" && pwd)
if [ -f "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" ]; then
    exec java -jar "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" "$@"
fi
echo "Gradle not found locally. Please ensure gradle is installed or run with gradle command."
exit 1
`;
    zip.file('gradlew', gradlewScript);

    const gradlewBat = `@rem Gradle start up script for Windows
@echo off
set DIRNAME=%~dp0
if exist "%DIRNAME%gradle\\wrapper\\gradle-wrapper.jar" (
    java -jar "%DIRNAME%gradle\\wrapper\\gradle-wrapper.jar" %*
) else (
    gradle %*
)
`;
    zip.file('gradlew.bat', gradlewBat);

    // 3. Fetch original images and clean transparent signature
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
        // Clean transparent signature
        url: '/public/assets/aistudio/salam_signature_clean.png',
        targets: [
          'assets/signature/salam_signature.png',
          'app/src/main/assets/signature/salam_signature.png',
          'assets/signature/salam_signature_clean.png',
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
