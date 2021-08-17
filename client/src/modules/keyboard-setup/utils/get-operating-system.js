import { LINUX, MAC, WINDOWS } from '../contstants/operating-systems';

const getOperatingSystem = () => {
  const os = [
    { name: WINDOWS, appVersion: 'Windows' },
    { name: MAC, appVersion: 'Mac' },
    { name: LINUX, appVersion: 'X11' },
  ];

  const userOs = os.find(v => navigator.appVersion.includes(v.appVersion));

  return userOs.name || WINDOWS;
};

export { getOperatingSystem };
