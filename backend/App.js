const express = require("express");
const db = require("./models/index");

const cors = require('cors')
const app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// Get all informations in databases
app.get('/all', async (req, res) => {
    try {
        const AllArtists = await db.Artist.findAll();
        const AllMusics = await db.Music.findAll();
        res.json({
            artists: AllArtists,
            musics: AllMusics
        });
    } catch (error) {
        res.send(error)
    }
})



//Search an artist with a specific id !
app.get('/artist/:id', async (req, res) => {
    const { id } = req.params;

    let artist = await db.Artist.findOne({
        where: {
            id: id
        }
    });
    if (artist != null) {
        res.json(artist)
    } else {
        res.send("There is no artist with this id!")
    }
})

//Search a music with a specific id !
app.get('/music/:id', async (req, res) => {
    const { id } = req.params;

    let music = await db.Music.findOne({
        where: {
            id: id
        }
    });
    if (music != null) {
        res.json(music)
    } else {
        res.send("There is no music with this id!")
    }
})

//Get an artist with all his musics !!
app.get('/ArtistAndMusics/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const AllArtists = await db.Artist.findAll({
            where: {
                id: id
            }
        });
        const AllMusics = await db.Music.findAll({
            where: {
                ArtistId: id
            }
        });
        res.json({
            artist: AllArtists,
            musics: AllMusics
        });
    } catch (error) {
        res.send(error)
    }
})


// Create an artist to put in the database
app.post('/artists/create', async (req, res) => {
    const data = req.body
    try {
        const createdArtist = await db.Artist.create(data);
        res.status(200);
        res.json({ success: "OK", data: { createdArtist } });
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send("Something wrong happens!")
    }
});

// Create a music to put in the database
app.post('/musics/create', async (req, res) => {
    const data = req.body
    try {
        const createdMusic = await db.Music.create(data);
        res.status(200);
        res.json({ success: "OK", data: { createdMusic } });
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send("Something wrong happens!")
    }
});

//UPDATE a music with a specific id
app.put('/update/music/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body

    await db.Music.findOne({
        where: {
            id: id
        }
    }).then(async (music)  =>  {
        const updatedMusic =  await music.update(data);
        res.status(200);
        res.json({ success: "OK", data: { updatedMusic } });
    }).catch((error) => {
        res.status(404);
        res.send(error)
    });
})

//UPDATE an artist with a specific id
app.put('/update/artist/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body

    await db.Artist.findOne({
        where: {
            id: id
        }
    }).then(async (artist)  =>  {
        const updatedArtist =  await artist.update(data);
        res.status(200);
        res.json({ success: "OK", data: { updatedArtist } });
    }).catch((error) => {
        res.status(404);
        res.send(error)
    });
})




// Delete an Artist with a specific Id
app.delete('/delete/artists/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.Artist.destroy({
            where: {
                id: id
            }
        });
        res.status(200);
        res.json({ success: "OK, artist deleted" });
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send("Something wrong happens!")
    }
})

// Delete a Music with a specific Id
app.delete('/delete/musics/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.Music.destroy({
            where: {
                id: id
            }
        });
        res.status(200);
        res.json({ success: "OK, music deleted" });
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send("Something wrong happens!")
    }
})












const port = 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})