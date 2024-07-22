// const express = required('express'); Common js
import express from "express";

// Tạo instand của express
const app = express()

app.get('/', (req, res) => {
    res.send('Server is run')
})

app.listen('3008', () => {
    console.log('Server is run on port 3008');
})