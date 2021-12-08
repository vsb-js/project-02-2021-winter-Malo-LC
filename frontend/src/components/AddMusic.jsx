import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config";

export function AddMusic() {
    const [data, setData] = useState(null);
    const [AlbumName, setName] = useState(null);

    const [CurrId, setId] = useState(1);

    // There are more ways how we can handle forms with React
    // One of them is to handle it with single state and onChange
    // We want to have only 1 state for the form data! Multiple states can lead to problems
    const [formState, setFormState] = useState({
        name: "",
        album: "",
        runTime: "",
        ArtistId: "",
    });



    useEffect(() => {
        try {
          axios.get(`${apiUrl}/ArtistAndMusics/` + CurrId).then((response) => {
            console.log(response.data);
            setData(response.data);
            response = response.data;
            response = response.musics[0];
            response = response.album
            setName(response);
          });
        } catch (error) {
          console.log(error)
        }
      }, [CurrId]);



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

    function onBrandChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ brand: e.target.value } };
        });
    }
    function onBrandChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ brand: e.target.value } };
        });
    }
    function onBrandChange(e) {
        setFormState((prevState) => {
            return { ...prevState, ...{ brand: e.target.value } };
        });
    }

    function handleFormSubmit() {
        console.log(formState);

        // We could include some form validation

        axios
            .post(`${apiUrl}/cars/create`, {
                name: formState.name,
                brand: formState.brand
            })
            .then((response) => {
                console.log(response.data);

                const dataFromServer = response.data;
                // This is something we have specified which is returned
                if (dataFromServer.success === "OK") {
                    // we want to inform the car that it was success
                    setActionResult("Car successfully created");
                }
            })
            .catch((reason) => {
                console.error(reason);
                setActionResult("There was an error creating the car");
            })
            .finally(
                // Finally is action which will happen regardless if it goes to "then" or "catch"

                // Let's clear the form
                setFormState({
                    name: "",
                    brand: "",
                }),
            );
    }

    // Btw we should definitely better design our form with CSS, add margins and other things
    return (
        <div>
            <Box component="form" noValidate>
                <div>
                    <TextField
                        required
                        id="Name"
                        label="Name"
                        defaultValue=""
                        value={formState.firstName}
                        onChange={onNameChange}
                    />
                    <TextField
                        required
                        id="brand"
                        label="Brand"
                        defaultValue=""
                        value={formState.lastName}
                        onChange={onBrandChange}
                    />
                </div>
                <Button variant="outlined" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </Box>
            {actionResult}
        </div>
    );
}
