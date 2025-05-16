const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('0029VahusSh0QeaoFzHJCk2x')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Wasi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function WASI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Wasi_Tech = Wasi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: '' + b64data });
	
				   let WASI_MD_TEXT = `
*_𝙎𝙚𝙨𝙨𝙞𝙤𝙣 𝘾𝙤𝙣𝙣𝙚𝙘𝙩𝙚𝙙 𝘽𝙮 𝙋𝙀𝘼𝘾𝙀𝙈𝘼𝙆𝙀𝙍*
*_𝙈𝙖𝙙𝙚 𝙬𝙞𝙩𝙝 🤍_*
______________________________________
╔════◇
║ *『𝘼𝙈𝘼𝙕𝙄𝙉𝙂 𝙔𝙊𝙐'𝙑𝙀 𝘾𝙃𝙊𝙎𝙀𝙉 𝙋𝙀𝘼𝘾𝙀𝙈𝘼𝙆𝙀𝙍 𝙈𝘿』*
║ _𝙎𝙐𝘾𝘾𝙀𝙎𝙎𝙁𝙐𝙇𝙇𝙔 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿🔥✅._
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ *Owner:* https://wa.me/254726293089_
║❒ *WaGroup:* _https://chat.whatsapp.com/C9uSfX68fg4F4hpbRhX7CW
║❒ *WaChannel:* _https:
╚════════════════════════╝
_____________________________________
	
_Don't Forget To Give Star To My Repo_`
	 await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id,{text:WASI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WASI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await WASI_MD_QR_CODE()
});
module.exports = router
