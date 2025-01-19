const { Telegraf } = require('telegraf'); 
const fs = require('fs');
const { on } = require('events');
const {
        pendaftaranOnline,
        informasiPendaftaran,
        syaratPendaftaran,
        pilihanAkhiran,
        pendaftaranOffline,
        cariData,
        menanganiIya,
        jalurDanKelas
        }  = require('./data');

// const bot = new Telegraf('7550933221:AAHfkcHHx3tp7YRq1A1VwGbT0yAKtOTp_9Y');  
const bot = new Telegraf('7900542071:AAH6T77g5H8nuZ97rGKTdx4Wp_TVXRISiAc');  

let responses;
try {
    responses = JSON.parse(fs.readFileSync('responses.json', 'utf8'));
} catch (error) {
    console.error('Error reading responses.json:', error);
}

// Menangani perintah /start
bot.start((ctx) => {
    const user = `${ctx.from.first_name ?? ''} ${ctx.from.last_name ?? ''}`.trim();
    console.log(user);
        ctx.reply(`Selamat datang ${user} di chatBot \n<b>UNIVERSITAS PANCASAKTI TEGAL. 
            \nFAKULTAS TEKNIK DAN ILMU KOMPUTER</b>`, { parse_mode: 'HTML' });
        ctx.reply(`'Terima kasih telah menghubungi admin bot <b>FAKULTAS TEKNIK DAN ILMU KOMPUTER</b>. 
            \nSilahkan klik <b>/info_pendaftaran</b> untuk mendapatkan info lebih lanjut....`, { parse_mode: 'HTML' });

        //mengirim gambar
        ctx.replyWithPhoto({ source: fs.createReadStream('./image/fakultas_teknik.jpg') })
        .then(() => {
            console.log('Gambar berhasil dikirim!');
        })
        .catch(err => {
            console.error('Gagal mengirim gambar:', err);
        });
});



// membuat perintah
bot.command('info_pendaftaran', (ctx) => {
    ctx.reply(cariData('info pendaftaran'), { parse_mode: 'HTML' })
});
bot.command('iya', (ctx) => {
    ctx.reply(cariData('info pendaftaran'), { parse_mode: 'HTML' })
});
bot.command('tidak', (ctx) => {
    ctx.reply(`Terima Kasih telah mengunjungi chatbot Universitas Pancasakti Tegal. Senang bisa membantu anda dalam mendapatkan informasi pendaftaran di kampus kami`)
});
bot.command('informatika', async (ctx) => {
    await ctx.reply(cariData('informatika') + jalurDanKelas, { parse_mode: 'HTML' });
    ctx.reply(informasiPendaftaran('informatika'), { parse_mode: 'HTML' });
});
bot.command('sipil', async (ctx) => {
    await ctx.reply(cariData('teknik sipil') + jalurDanKelas, { parse_mode: 'HTML' });
    ctx.reply(informasiPendaftaran('teknik sipil'), { parse_mode: 'HTML' });
});
bot.command('mesin', async (ctx) => {
    await ctx.reply(cariData('teknik mesin') + jalurDanKelas, { parse_mode: 'HTML' });
    ctx.reply(informasiPendaftaran('teknik mesin'), { parse_mode: 'HTML' });
});
bot.command('SI', async (ctx) => {
    await ctx.reply(cariData('sistem informasi') + jalurDanKelas, { parse_mode: 'HTML' });
    ctx.reply(informasiPendaftaran('sistem informasi'), { parse_mode: 'HTML' });
});
bot.command('industri', async (ctx) => {
    await ctx.reply(cariData('teknik industri') + jalurDanKelas, { parse_mode: 'HTML' });
    ctx.reply(informasiPendaftaran('teknik industri'), { parse_mode: 'HTML' });
});
bot.command('syarat_pendaftaran', async (ctx) => {
    await ctx.reply(syaratPendaftaran(ctx.from.first_name,ctx.from.last_name), { parse_mode: 'HTML' });
    ctx.reply(`informasi lain tentang prodi ini:\n/pendaftaran_online\n/pendaftaran_offline \n\n${pilihanAkhiran}`, { parse_mode: 'HTML' });
});
bot.command('pendaftaran_online', async (ctx) => {
    await ctx.reply(pendaftaranOnline, { parse_mode: 'HTML' });
    ctx.reply(`informasi lain tentang prodi ini:\n/syarat_pendaftaran\n/pendaftaran_offline \n\n${pilihanAkhiran}` , { parse_mode: 'HTML' });
});
bot.command('pendaftaran_offline', async (ctx) => {
    await ctx.reply(`${pendaftaranOffline}\n\nmaps: https://maps.app.goo.gl/bpR1XXL4TMXQsqVw9`, { parse_mode: 'HTML' });
    await ctx.replyWithPhoto({ source: fs.createReadStream('./image/denah_rektor.png') })
    ctx.reply(`informasi lain tentang prodi ini:\n/syarat_pendaftaran\n/pendaftaran_online \n\n${pilihanAkhiran}`, { parse_mode: 'HTML' });
});



// Menangani pesan teks
bot.on('text',  (ctx) => { 
    const userMessage = ctx.message.text.toLowerCase(); 
    let responseFound = false;
    
   const response =  responses.find((r) => {
        if (r.question === userMessage) {
            responseFound = true;
            ctx.reply(r.answer + jalurDanKelas, { parse_mode: 'HTML' })
            ctx.reply(informasiPendaftaran(r.question), { parse_mode: 'HTML' });
            return true;

        } else if (r.question + " syarat pendaftaran" === userMessage) {
            ctx.reply(syaratPendaftaran(ctx.from.first_name,ctx.from.last_name), { parse_mode: 'HTML' });
            ctx.reply(informasiPendaftaran(r.question));
            ctx.reply(pilihanAkhiran, { parse_mode: 'HTML' });
            responseFound = true;
            return true;

        } else if (r.question + " pendaftaran online" === userMessage) {
            ctx.reply(pendaftaranOnline, { parse_mode: 'HTML' })
            ctx.reply(informasiPendaftaran(r.question));
            ctx.reply(pilihanAkhiran, { parse_mode: 'HTML' });
            responseFound = true; 
            return true; 

        } else if (r.question + " pendaftaran offline" === userMessage) {
            ctx.reply(pendaftaranOffline);
            ctx.reply(informasiPendaftaran(r.question), { parse_mode: 'HTML' });
            ctx.reply(pilihanAkhiran, { parse_mode: 'HTML' });
            responseFound = true; 
            return true; 
        }
    });

    if (!responseFound) {
        if(userMessage==='ya'||userMessage==='iya'||userMessage==='y'){
        ctx.reply(menanganiIya(ctx.from.first_name,ctx.from.last_name), { parse_mode: 'HTML' })
    }else if(userMessage==='tidak'||userMessage==='tdk'){
        ctx.reply(`Terima Kasih telah mengunjungi chatbot Universitas Pancasakti Tegal. Senang bisa membantu anda dalam mendapatkan informasi pendaftaran di kampus kami`)
    }else{
        ctx.reply("Maaf, keyword yang anda masukkan salah.");

    }
    }
});

// Memulai bot
bot.launch().then(() => {
    console.log('Bot is running...');
}).catch(err => {
    console.error('Failed to launch bot:', err);
});