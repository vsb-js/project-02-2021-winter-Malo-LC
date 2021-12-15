import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function AddArtist() {
    const [ArtistNames, setArtist] = useState(null);
    const [formState, setFormState] = useState({
        name: "",
        followers: "",
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

    function onFollowersChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ followers: e.target.value * 1 } };
        });
    }

    function handleFormSubmit() {
        console.log(formState);

        if (formState.name !== "" && Number.isInteger(formState.followers)) {  //validation
            axios
                .post(`${apiUrl}/artists/create`, {
                    name: formState.name,
                    followers: formState.followers
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
                    setActionResult("There was an error creating the Artist");
                })
                .finally(
                    setFormState({
                        name: "",
                        followers: "",
                    }),
                );
        }
        else {
            setActionResult("There was an error creating the Artist");
        }
    }

    if (!ArtistNames) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <h1 className="centered">Add an Artist into the database</h1>
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
                        id="Followers"
                        label="Followers"
                        type="number"
                        value={formState.album}
                        onChange={onFollowersChange}
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
