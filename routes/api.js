import { Router } from 'express';
import fs from 'fs';
import path from 'path'
import axios from 'axios';
import config from '../app.config';
import db from '../utils/db';

require('dotenv')
	.config()

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

const speech_to_text = new SpeechToTextV1({
	username: process.env.S2T_USERNAME,
	password: process.env.S2T_PASSWORD
});

const reminders = db.get('reminders');
const router = Router();

router.get('/api/textToSpeech', (req, res, next) => {
	const format = "mp3";
	const { text, voice } = req.query;
	axios.post(process.env.T2S_URL + '/v1/synthesize?voice=' + voice, {
			text,
		}, {
			headers: {
				"Accept": "audio/" + format,
				"Content-Type": "application/json"
			},
			responseType: 'arraybuffer',
			withCredentials: true,
			auth: {
				username: process.env.T2S_USERNAME,
				password: process.env.T2S_PASSWORD
			},
		})
		.then(rep => {
			const timeStamp = Date.now();
			const filename = timeStamp + '_extract.' + format;
			var mp3_file = fs.createWriteStream(__dirname + '/../public/' + filename);
			mp3_file.on('open', function(fd) {
				mp3_file.write(rep.data);
				mp3_file.end();
			});
			mp3_file.on('close', () => {
				res.status(200)
					.send({
						fileUrl: config.static.root + '/' + filename,
						filename,
					})
			})
		})
		.catch(err => {
			if (err.response) {
				console.log(err.response.status)
				console.log(err.response.data)
			}
			console.error(err);
			res.status(500)
				.send(
					JSON.stringify({
						error: err
					})
				)
		});
})

router.get('/api/speechToText', (req, res, next) => {
	const format = "mp3";
	const { filename, model } = req.query;
	const file = fs.createReadStream(__dirname + '/../public/' +
		filename +
		'.' +
		format
	)
	speech_to_text.recognize({
		audio: file,
		model: model + "_BroadbandModel",
		content_type: 'audio/' + format,
	}, (err, transcript) => {
		return new Promise((resolve, reject) => {
				if (err) reject(err)
				resolve(transcript)
			})
			.then(transcript => {
				console.log(transcript);
				res.status(200)
					.send(transcript)
			})
			.catch(err => {
				console.error(err);
				res.status(500)
					.end(err)
			});
	})
})

export default router;
