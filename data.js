const fs = require('fs');
function kontak(name){
    let nama = name.toLowerCase()
    switch(nama){
        case 'informatika':
        case 'sistem informasi':
        case 'teknik industri':
            return {nama:'Pak bambang',link:'http://api.whatsapp.com/send?phone=6287837152915/PakBambang'};
            break;
        case 'teknik mesin':
            return {nama:'Pak Hendi',link:'http://api.whatsapp.com/send?phone=6285866670250/PakHendi'};
            break;
        case 'teknik sipil':
            return {nama:'Bu Ani',link:'http://api.whatsapp.com/send?phone=6285742422530/BuAni'};
            break;
    }
}

//menghubungkan ke file json
let responses;
try {
    responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'));
} catch (error) {
    console.error('Error reading responses.json:', error);
}

function cariData(value){
    let data = '';
    const response = responses.find(a=>{
       if(a.question == value){
        data += a.answer 
        }})
        return data;
}

// template srting 
 const pendaftaranOnline="<b>AKSES WEBSITE PMB</b> \n\n\n1. Buka laman https://pmb.upstegal.ac.id Klik DAFTAR\n2. Isi Formulir\nPilih program Studi-Fakultas dan Jenis Pendaftaran (REGULER/KONVERSI/KIP/KHUSUS). Kemudian lengkapi semua isian, dan klik Daftar. Seteleh berhasil simpan/cetak no pendaftaran Virtual Acount (VA), username dan password anda, cetak bila perlu. sistem juga mengirim info melalui SMS\n3. Bayar Pendaftaran\nbayarlah biaya pendafatan Rp. 300.000,- ke Teller Bank Jateng, dengan memberikan nomor pendafataran (VA) anda, atau juga melalui metode transfer ATM dan internet Banking/Mobile Bangking\n4. Cek Kelngkapan\nBuka http://pmb.upstegal.ac.id/servicelogin untuk melakukan login dengan User dan Password lengkapi informasi anda, foto, ijazah, dll\n5. verifikasi dan Seleksi\nSelalu cek akun anda, setelah diverifikasi oelh petugas pendaftaran\n\n\n<b>ISI FORMULIR</b>\n1. Pilih program Studi-Fakultas\n2. Pilih Jenis Pendaftaran (REGULER/KONVERSI/KIP/KHUSUS). \n3. Lengkapi semua isian, dan klik Daftar. \n4. Seteleh berhasil simpan/cetak no pendaftaran Virtual Acount (VA), username dan password anda, cetak bila perlu. sistem juga mengirim info melalui SMS\n\n\n<b>BAYAR PENDAFTARAN</b>\n1. Melakukan Pembayaran biaya pendafatan Rp. 300.000,- ke Teller Bank Jateng, dengan memberikan nomor pendafataran (VA) anda, atau juga melalui metode transfer ATM dan internet Banking/Mobile Bangking\n2. Simpan Bukti Pembayaran\n\n\n<b>CEK KELENGKAPAN</b>\n1. Membuka laman http://pmb.upstegal.ac.id/servicelogin untuk melakukan login dengan User dan Password\n2. Melengkapi informasi anda, foto, ijazah, dll\n\n\n<b>VERIFIKASI DAN SELEKSI</b>\nSelalu cek akun anda, setelah diverifikasi oleh petugas pendaftaran";
 const pilihanAkhiran = `apakah anda ingin melihat info pendaftaran prodi lain?\n <b>(/iya)</b> atau <b>(/tidak)</b>`;
 const pendaftaranOffline = `Anda bisa langsung datang ke ruangan administrasi di universitas pancasakti tegal. Dengan membayar biaya pendaftaran sebesar 300k. Serta membawa dokumen-dokumen yang dipelukan. silahkan cek dokumen yang harus dibawa pada perintah berikut /syarat_pendaftaran`;
 const jalurDanKelas = "\n\n\n<b>Jalur dan kelas yang tersedia di prodi ini yaitu:</b>\nKelas :\n     1) Kelas Reguler Pagi dan Reguler Sore\n     2) Konversi/Pindahan\n\nJalur :\n     1) KIP Kuliah\n     2) Jalur Khusus";


 // function
function syaratPendaftaran (first_name,last_name){
    return `Hai ${(first_name && last_name) ? first_name + ' ' + last_name : ''}. \n\n<b>Pendaftaran dan Seleksi :</b>\nPendaftaran dapat dilakukan melalui pmb.upstegal.ac.id atau dengan datang langsung ke kampus Universitas Pancasakti Tegal dengan membawa persyaratan sebagai berikut \n\n<b>Persyaratan :</b> \n1) Fotocopy Ijazah/Nilai rata-rata rapot STTB/STK dan UN/US/UTBK yang dilegalisir \n2) Fotocopy KTP dan KK \n3) Fotocopy Akte Kelahiran \n4) Photo Hitam Putih 3x4 (2 Lembar) \n5) Membayar biaya pendaftaran Rp. 300.000`
}

function informasiPendaftaran(prodi){
    const {nama,link} = kontak(prodi)
    return`Untuk informasi pendaftaran bisa klik perintah berikut:\n     a) ${prodi} /syarat_pendaftaran\n     b) ${prodi} /pendaftaran_online\n     c) ${prodi} /pendaftaran_offline \n     d)<a href="${link}"> Hubungi admin (${nama})</a>`
 }

function menanganiIya(first_name,last_name){
    return `Hai **${(first_name && last_name) ? first_name + ' ' + last_name : ''}**, sepertinya anda masih bingung dengan pilihan anda. Jangan khawatir, saya siap membantu.\nSilahkan pilih salah satu prodi:\n\n1. Informatika\n2. Teknik Sipil\n3.Teknik Mesin\n4.Teknik Industri\n5. Sistem Informasi\n\n(masukkan nama prodinya saja)`
}



//export module
module.exports={
    pendaftaranOnline,
    informasiPendaftaran,
    syaratPendaftaran,
    pilihanAkhiran,
    pendaftaranOffline,
    cariData,
    menanganiIya,
    jalurDanKelas
};