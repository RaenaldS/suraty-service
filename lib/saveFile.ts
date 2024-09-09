import fs from "fs";
export const saveFile = async (file: any, dest: string, namaFileBaru = undefined): Promise<string> => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const data = fs.readFileSync(file.filepath);
  let namaFile = namaFileBaru ? namaFileBaru : file.originalFilename;
  let pemisah = namaFile.lastIndexOf(".");
  let ext = namaFile.substring(pemisah);
  namaFile = namaFile.substring(0, pemisah);
  let tmpNamaFile = namaFile;
  //   const destinasi = "./public/img/users/";
  let counter = 0;
  let ketemu = false;

  while (!ketemu) {
    if (fs.existsSync(`${dest}${tmpNamaFile}${ext}`)) {
      counter++;
      tmpNamaFile = namaFile + "_" + counter;
    } else {
      ketemu = true;
    }
  }

  fs.writeFileSync(`${dest}${tmpNamaFile}${ext}`, data);
  fs.unlinkSync(file.filepath);
  return tmpNamaFile + ext;
};

export const saveFileFromBuffer = async (file: File, dest: string, namaFileBaru = undefined): Promise<string> => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // const data = fs.readFileSync(file.filepath);
  let namaFile = namaFileBaru ? namaFileBaru : file.name;
  let pemisah = namaFile.lastIndexOf(".");
  let ext = namaFile.substring(pemisah);
  namaFile = namaFile.substring(0, pemisah);
  let tmpNamaFile = namaFile;
  //   const destinasi = "./public/img/users/";
  let counter = 0;
  let ketemu = false;

  while (!ketemu) {
    if (fs.existsSync(`${dest}${tmpNamaFile}${ext}`)) {
      counter++;
      tmpNamaFile = namaFile + "_" + counter;
    } else {
      ketemu = true;
    }
  }

  const dt = await file.arrayBuffer();
  fs.appendFile(`${dest}${tmpNamaFile}${ext}`, Buffer.from(dt), (err) => {
    if (err) throw err;
  });

  return tmpNamaFile + ext;
};
