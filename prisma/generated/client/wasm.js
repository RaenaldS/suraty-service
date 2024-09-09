
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.17.0
 * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
 */
Prisma.prismaVersion = {
  client: "5.17.0",
  engine: "393aa359c9ad4a4bb28630fb5613f9c281cde053"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UsersScalarFieldEnum = {
  user_id: 'user_id',
  user_nama: 'user_nama',
  user_nip: 'user_nip',
  user_email: 'user_email',
  user_hp: 'user_hp',
  user_image: 'user_image',
  user_alamat: 'user_alamat',
  user_jabatan: 'user_jabatan',
  user_name: 'user_name',
  user_pass: 'user_pass',
  user_level: 'user_level',
  user_lastip: 'user_lastip',
  user_lastlogin: 'user_lastlogin',
  user_created: 'user_created',
  user_updated: 'user_updated',
  user_deleted: 'user_deleted'
};

exports.Prisma.JabatanScalarFieldEnum = {
  jabatan_id: 'jabatan_id',
  jabatan_nama: 'jabatan_nama',
  jabatan_created: 'jabatan_created',
  jabatan_updated: 'jabatan_updated',
  jabatan_deleted: 'jabatan_deleted'
};

exports.Prisma.SktmScalarFieldEnum = {
  sktm_id: 'sktm_id',
  sktm_noSurat: 'sktm_noSurat',
  sktm_nama: 'sktm_nama',
  sktm_tgl_lahir: 'sktm_tgl_lahir',
  sktm_tempat_lahir: 'sktm_tempat_lahir',
  sktm_suku: 'sktm_suku',
  sktm_agama: 'sktm_agama',
  sktm_jk: 'sktm_jk',
  sktm_noKtp: 'sktm_noKtp',
  sktm_pekerjaan: 'sktm_pekerjaan',
  sktm_alamat: 'sktm_alamat',
  sktm_dusun: 'sktm_dusun',
  sktm_kepentingan: 'sktm_kepentingan',
  sktm_ttd: 'sktm_ttd',
  sktm_createdBy: 'sktm_createdBy',
  sktm_created: 'sktm_created',
  sktm_updated: 'sktm_updated',
  sktm_deleted: 'sktm_deleted'
};

exports.Prisma.BelumNikahScalarFieldEnum = {
  nikah_id: 'nikah_id',
  nikah_nomor: 'nikah_nomor',
  nikah_nama: 'nikah_nama',
  nikah_jk: 'nikah_jk',
  nikah_tempat_lahir: 'nikah_tempat_lahir',
  nikah_tgl_lahir: 'nikah_tgl_lahir',
  nikah_suku: 'nikah_suku',
  nikah_agama: 'nikah_agama',
  nikah_nik: 'nikah_nik',
  nikah_alamat: 'nikah_alamat',
  nikah_kepentingan: 'nikah_kepentingan',
  nikah_ttd: 'nikah_ttd',
  nikah_createdBy: 'nikah_createdBy',
  nikah_created: 'nikah_created',
  nikah_updated: 'nikah_updated',
  nikah_deleted: 'nikah_deleted'
};

exports.Prisma.SkckScalarFieldEnum = {
  skck_id: 'skck_id',
  skck_nomor: 'skck_nomor',
  skck_nama: 'skck_nama',
  skck_tempat_lahir: 'skck_tempat_lahir',
  skck_tanggal_lahir: 'skck_tanggal_lahir',
  skck_jk: 'skck_jk',
  skck_agama: 'skck_agama',
  skck_statusKawin: 'skck_statusKawin',
  skck_pekerjaan: 'skck_pekerjaan',
  skck_suku: 'skck_suku',
  skck_nik: 'skck_nik',
  skck_alamat: 'skck_alamat',
  skck_pendidikan_terakhir: 'skck_pendidikan_terakhir',
  skck_kepentingan: 'skck_kepentingan',
  skck_ttd: 'skck_ttd',
  skck_createdBy: 'skck_createdBy',
  skck_created: 'skck_created',
  skck_updated: 'skck_updated',
  skck_deleted: 'skck_deleted'
};

exports.Prisma.KehilanganScalarFieldEnum = {
  hilang_id: 'hilang_id',
  hilang_nomor: 'hilang_nomor',
  hilang_nama: 'hilang_nama',
  hilang_jk: 'hilang_jk',
  hilang_umur: 'hilang_umur',
  hilang_pekerjaan: 'hilang_pekerjaan',
  hilang_alamat: 'hilang_alamat',
  hilang_hari: 'hilang_hari',
  hilang_barang: 'hilang_barang',
  hilang_dari: 'hilang_dari',
  hilang_ke: 'hilang_ke',
  hilang_ttd: 'hilang_ttd',
  hilang_createdBy: 'hilang_createdBy',
  hilang_created: 'hilang_created',
  hilang_updated: 'hilang_updated',
  hilang_deleted: 'hilang_deleted'
};

exports.Prisma.PenghasilanScalarFieldEnum = {
  hasil_id: 'hasil_id',
  hasil_nomor: 'hasil_nomor',
  hasil_nama: 'hasil_nama',
  hasil_umur: 'hasil_umur',
  hasil_pekerjaan: 'hasil_pekerjaan',
  hasil_alamat: 'hasil_alamat',
  hasil_penghasilan: 'hasil_penghasilan',
  hasil_ttd: 'hasil_ttd',
  hasil_createdBy: 'hasil_createdBy',
  hasil_created: 'hasil_created',
  hasil_updated: 'hasil_updated',
  hasil_deleted: 'hasil_deleted'
};

exports.Prisma.TaniScalarFieldEnum = {
  tani_id: 'tani_id',
  tani_nomor: 'tani_nomor',
  tani_nama: 'tani_nama',
  tani_jabatan: 'tani_jabatan',
  tani_sekretariat: 'tani_sekretariat',
  tani_alamat: 'tani_alamat',
  tani_keperluan: 'tani_keperluan',
  tani_tujuanBantuan: 'tani_tujuanBantuan',
  tani_ttd: 'tani_ttd',
  tani_createdBy: 'tani_createdBy',
  tani_created: 'tani_created',
  tani_updated: 'tani_updated',
  tani_deleted: 'tani_deleted'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  users: 'users',
  jabatan: 'jabatan',
  sktm: 'sktm',
  belumNikah: 'belumNikah',
  skck: 'skck',
  kehilangan: 'kehilangan',
  penghasilan: 'penghasilan',
  tani: 'tani'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
