import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function DeleteMusic() {
    const [songNames, setSongs] = useState(null);
    const [CurrId, setCurrid] = useState(null);

    useEffect(() => {

        //Get all songs names

        try {
            axios.get(`${apiUrl}/all`).then(async (response) => {
                response = response.data;
                response = response.musics;
                console.log(response);
                setSongs(response)


            });
        } catch (error) {
            console.log(error)
        }
    }, []);

    const [actionResult, setActionResult] = useState(null);

    function onDropDownChange(e) {
        setCurrid(e.target.value * 1)
    }

    function handleFormSubmit() {
        console.log(songNames[CurrId]);

        if (Number.isInteger(CurrId)) {
            axios
                .delete(`${apiUrl}/delete/musics/` + CurrId)
                .then(() => {
                    setActionResult("Music successfully deleted, refresh the page to see it");
                })
                .catch((reason) => {
                    console.error(reason);
                    setActionResult("There was an error deleting the Music");
                })
        }
        else {
            setActionResult("There was an error deleting the Music");
        }

    }

    if (!songNames) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <h1 className="centered">Delete a Music from the database</h1>

            <p id="pChoose">
                Choose an already existing Song :
                <select id="selectSyle" onChange={(e) => {
                    onDropDownChange(e)
                    console.log(CurrId)
                }}>
                    {
                        songNames.map((names) => {
                            return <option key={names.id} value={names.id}>{names.name}</option>
                        })
                    }
                </select>
            </p>
            <Box className="center" component="form" noValidate>
                <Button variant="outlined" onClick={handleFormSubmit}>
                    Delete
                </Button>
            </Box>
            <p className="Confirmation">{actionResult}</p>
        </div>
    );
}
