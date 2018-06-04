import { Router } from 'express';
import fs from 'fs';
import path from 'path'
import { Readable } from 'stream'

import axios from 'axios';
import config from '../app.config';
import db from '../utils/db';

require('dotenv')
	.config()

const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

const textToSpeech = new TextToSpeechV1({
	username: process.env.T2S_USERNAME,
	password: process.env.T2S_PASSWORD
})

const speechToText = new SpeechToTextV1({
	username: process.env.S2T_USERNAME,
	password: process.env.S2T_PASSWORD
});

const reminders = db.get('reminders');
const router = Router();
const format = "mp3";

router.get('/api/textToSpeech',
	(req, res, next) => {
		const { text, voice } = req.query;
		const timeStamp = Date.now();
		const filename = timeStamp + '_extract.' + format;
		textToSpeech.synthesize({
				text,
				accept: 'audio/' + format,
				voice
			}, (err, body, response) => {
				return new Promise((resolve, reject) => {
					if (err) reject(err);
					if (body) {
						const stream = new Readable()
						stream._read = () => {}
						stream.push(body)
						stream.push(null)
						stream.pipe(fs.createWriteStream(__dirname + '/../public/' + filename));
						resolve({
							fileUrl: config.static.root + '/' + filename,
							filename
						})
					}
				}).then(({filename, fileUrl}) => {
					res.status(200).send({fileUrl, filename})
				}).catch(err => {
					console.error(err)
					res.status(500).send(err);
				})
			})
	}
);

router.get('/api/speechToText',
	(req, res, next) => {
		const { filename, model } = req.query;
		const file = fs.createReadStream(__dirname + '/../public/' +
			filename +
			'.' +
			format
		)
		speechToText.recognize({
			audio: file,
			model: model + "_BroadbandModel",
			content_type: 'audio/' + format,
		}, (err, transcript) => {
			return new Promise((resolve, reject) => {
					if (err) reject(err)
					resolve(transcript)
				})
				.then(transcript => {
					res.status(200)
						.send(transcript)
				})
				.catch(err => {
					console.error(err);
					res.status(500)
						.end(err)
				});
		})
	}
)

export default router;
