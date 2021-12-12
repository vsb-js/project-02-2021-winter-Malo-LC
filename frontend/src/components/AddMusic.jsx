import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function AddMusic() {
    const [ArtistNames, setArtist] = useState(null);
    const [CurrId, setId] = useState(1);


    let j = 1;
    // There are more ways how we can handle forms with React
    // One of them is to handle it with single state and onChange
    // We want to have only 1 state for the form data! Multiple states can lead to problems
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



    // we want to have some kind of action result when we hit the API
    const [actionResult, setActionResult] = useState(null);

    function onNameChange(e) {
        // To get the value of the field, it's the same as before with any input
        const inputValue = e.target.value;

        // Using the current state object might lead to issues because setState is async action!
        // !! THIS IS WRONG !!
        // const newState = { ...formState, ...{ firstName: inputValue } };
        // setFormState(newState);

        // setState can accept callback (a function) which gives you the previous state variable in the correct format
        setFormState((prevState) => {
            return { ...prevState, ...{ name: inputValue } };
        });
    }

    function onAlbumChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ album: e.target.value } };
        });
    }
    function onRunTimeChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ runTime: e.target.value*1 } };
        });
    }
    function onArtistIdChangeDropDown(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ ArtistId: e.target.value*1 } };
        });
    }

    function handleFormSubmit() {
        console.log(formState);
        if(true){
            console.log(typeof(formState.runTime) )
        }




        // We could include some form validation
        if(formState.name!=="" && formState.album!=="" && Number.isInteger(formState.runTime)){
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
                // This is something we have specified which is returned
                if (dataFromServer.success === "OK") {
                    // we want to inform the car that it was success
                    setActionResult("Music successfully created");
                }
            })
            .catch((reason) => {
                console.error(reason);
                setActionResult("There was an error creating the Music");
            })
            .finally(
                // Finally is action which will happen regardless if it goes to "then" or "catch"

                // Let's clear the form
                setFormState({
                    name: "",
                    album: "",
                    runTime: "",
                    ArtistId: "",
                }),
            );
        }
        else{
            setActionResult("There was an error creating the Music");
        }
        
    }

    if (!ArtistNames) {
        return <div>Loading...</div>;
    }

    // Btw we should definitely better design our form with CSS, add margins and other things
    return (
        <div >
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
