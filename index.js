const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express()
// client ID: 656046300885-oc86qdp6s91g0b4laept87lldkksueak.apps.googleusercontent.com

// client secret:
g2QYlqVgtwiq8iiumtaNdG7m



passport.use(new GoogleStrategy())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
})