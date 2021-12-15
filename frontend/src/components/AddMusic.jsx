import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function AddMusic() {
    const [ArtistNames, setArtist] = useState(null);
    const [CurrId, setId] = useState(1);
    let j = 1;
    const [formState, setFormState] = useState({
        name: "",
        album: "",
        runTime: 0,
        ArtistId: 1,
    });

    useEffect(() => {

        //Get all artists names

        try {
            axios.get(`${apiUrl}/all`).then(async (response) => {
                response = response.data;
                response = response.artists;
                console.log(response);
                setArtist(response)


            });
        } catch (error) {
            console.log(error)
        }
    }, []);

    const [actionResult, setActionResult] = useState(null);

    function onNameChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ name: e.target.value } };
        });
    }

    function onAlbumChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ album: e.target.value } };
        });
    }
    function onRunTimeChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ runTime: e.target.value * 1 } };
        });
    }
    function onArtistIdChangeDropDown(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ ArtistId: e.target.value * 1 } };
        });
    }

    function handleFormSubmit() {
        console.log(formState);
        if (true) {
            console.log(typeof (formState.runTime))
        }

        if (formState.name !== "" && formState.album !== "" && Number.isInteger(formState.runTime)) {
            axios
                .post(`${apiUrl}/musics/create`, {
                    name: formState.name,
                    album: formState.album,
                    runTime: formState.runTime,
                    ArtistId: formState.ArtistId,
                })
                .then((response) => {
                    console.log(response.data);
                    const dataFromServer = response.data;
                    if (dataFromServer.success === "OK") {
                        setActionResult("Music successfully created");
                    }
                })
                .catch((reason) => {
                    console.error(reason);
                    setActionResult("There was an error creating the Music");
                })
                .finally(
                    setFormState({
                        name: "",
                        album: "",
                        runTime: "",
                        ArtistId: "",
                    }),
                );
        }
        else {
            setActionResult("There was an error creating the Music");
        }
    }

    if (!ArtistNames) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <h1 className="centered">Add a music into the database</h1>
            <p id="pChoose">
                Choose an already existing Artist :
                <select id="selectSyle" value={CurrId} onChange={(e) => {
                    setId(e.target.value)
                    onArtistIdChangeDropDown(e)
                    console.log(formState)
                }}>
                    {
                        ArtistNames.map((names) => {
                            return <option key={names.id} value={j++}>{names.name}</option>
                        })
                    }
                </select>
            </p>
            <Box className="center" component="form" noValidate>
                <div className="field">
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="Name"
                        label="Name"
                        value={formState.name}
                        onChange={onNameChange}
                    />
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="Album"
                        label="Album"
                        value={formState.album}
                        onChange={onAlbumChange}
                    />
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        required
                        id="RunTime"
                        label="RunTime"
                        type="number"
                        value={formState.runTime}
                        onChange={onRunTimeChange}
                    />
                </div>
                <Button variant="outlined" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </Box>
            <p className="Confirmation">{actionResult}</p>
        </div>
    );
}
