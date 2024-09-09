export const rupiah = (angka: number) => {
  const rup = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const nilai = rup
    .format(Number(angka))
    .replace(/^([\d,.]+)/, "$1 ")
    .replace(/([\d,.]+)$/, " $1");
  return nilai;
};

export function formatNumber(num: number): string {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function terbilang(angka: number): string {
  var hasil_bagi = 0,
    hasil_mod = 0;
  let bilangan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];
  if (angka < 12) {
    return bilangan[angka];
  } else if (angka < 20) {
    return bilangan[angka - 10] + " Belas";
  } else if (angka < 100) {
    // hasil_bagi = Math.round(angka / 10);
    hasil_bagi = parseInt(String(angka / 10));
    hasil_mod = angka % 10;
    return (bilangan[hasil_bagi] + " Puluh " + bilangan[hasil_mod]).trim();
  } else if (angka < 200) {
    return "Seratus " + terbilang(angka - 100);
  } else if (angka < 1000) {
    hasil_bagi = parseInt(String(angka / 100));
    hasil_mod = angka % 100;
    return (bilangan[hasil_bagi] + " Ratus " + terbilang(hasil_mod)).trim();
  } else if (angka < 2000) {
    return ("Seribu " + terbilang(angka - 1000)).trim();
  } else if (angka < 1000000) {
    hasil_bagi = parseInt(String(angka / 1000));
    hasil_mod = angka % 1000;
    return terbilang(hasil_bagi) + " Ribu " + terbilang(hasil_mod);
  } else if (angka < 1000000000) {
    hasil_bagi = parseInt(String(Number(BigInt(angka) / 1000000n)));
    hasil_mod = Number(BigInt(angka) % 1000000n);
    return (terbilang(hasil_bagi) + " Juta " + terbilang(hasil_mod)).trim();
  } else if (angka < 1000000000000) {
    hasil_bagi = parseInt(String(Number(BigInt(angka) / 1000000000n)));
    hasil_mod = Number(BigInt(angka) % 1000000000n);
    return (terbilang(hasil_bagi) + " Milyar " + terbilang(hasil_mod)).trim();
  } else if (angka < 1000000000000000) {
    hasil_bagi = parseInt(String(Number(BigInt(angka) / 1000000000000n)));
    hasil_mod = Number(BigInt(angka) % 1000000000000n);
    return (terbilang(hasil_bagi) + " Triliun " + terbilang(hasil_mod)).trim();
  } else {
    return "Data Salah";
  }
}

export const pembulatan = function (angka: BigInt | number): string {
  if (Number(angka) > 1000000000000)
    return (Number(angka) / 1000000000000).toFixed(2) + " T";
  else if (Number(angka) > 1000000000)
    return (Number(angka) / 1000000000).toFixed(2) + " M";
  else if (Number(angka) > 1000000)
    return (Number(angka) / 1000000).toFixed(2) + " JT";
  else if (!angka) return "0";
  else return Number(angka).toString();
};
