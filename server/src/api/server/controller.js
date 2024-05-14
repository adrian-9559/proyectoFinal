const pidusage = require('pidusage');
const fs = require('fs');
const os = require('os');

// Obtener la cantidad de CPUs disponibles en el sistema
const numCPUs = os.cpus().length;

const getUseServerCPU = async () => {
  // Obtener la carga promedio del sistema
  const loadAvg = os.loadavg();
  // Calcular el uso total de la CPU en porcentaje
  const totalUsage = (loadAvg[0] / numCPUs) * 100;
  return totalUsage.toFixed(2);
}

const getUseServerRAM = async () => {
  // Obtener la memoria total y la memoria libre
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  // Calcular el uso de la memoria en porcentaje
  const usedMem = totalMem - freeMem;
  const totalUsage = (usedMem / totalMem) * 100;

  return totalUsage.toFixed(2);
}

const getDiskUsage = async () => {
  // Obtener la información del disco
  const diskInfo = fs.statSync('/');

  // Calcular el uso del disco
  const totalSpace = diskInfo.blocks * diskInfo.blksize;
  const freeSpace = diskInfo.blocks * diskInfo.blksize - diskInfo.size;

  // Calcular el porcentaje de espacio libre
  const freeSpacePercentage = (freeSpace / totalSpace) * 10;

  return freeSpacePercentage.toFixed(2);
}

const getUseServerInfo = async () => {
  const cpuUsage = await getUseServerCPU();
  const ramUsage = await getUseServerRAM();
  const diskUsage = await getDiskUsage();

  return {
    cpu: cpuUsage,
    ram: ramUsage,
    disk: diskUsage
  }
}

module.exports = {
  getUseServerInfo,
  getUseServerCPU,
  getUseServerRAM,
  getDiskUsage
}