import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useLocalContect } from "../../context/context";

const MenuItem = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { setCategory, category, options } = useLocalContect();
  return (
    <div className="autocomplete">
      <Autocomplete
        value={category}
        onChange={(event, newValue) => {
          setCategory(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newValue) => {
          setInputValue(newValue);
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Categorize" variant="outlined" />
        )}
      />
    </div>
  );
};

export default MenuItem;
