import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AutocompleteProps,
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  clearMedication,
  fetchMedication,
  selectMedications,
} from "../../hooks/slices/medications";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Medication } from "../utils/commons";

const MedicationSearchBar = ({ onChange }: any) => {
  const dispatch = useAppDispatch();
  const { isLoading, medications } = useAppSelector(selectMedications);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetch = setTimeout(() => {
      if (inputValue.length > 0) {
        dispatch(fetchMedication({ keyword: inputValue }));
      }
    }, 500);

    return () => {
      dispatch(clearMedication());
      clearTimeout(fetch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <Grid container>
      <Autocomplete
        id="medication-search-bar"
        fullWidth
        onChange={onChange}
        loadingText="Loading Medications..."
        noOptionsText="No Medication Found"
        onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(options) =>
          typeof options.name === "string" ? options.name : ""
        }
        disableClearable
        selectOnFocus
        options={medications}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search medication"
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};
export default MedicationSearchBar;
