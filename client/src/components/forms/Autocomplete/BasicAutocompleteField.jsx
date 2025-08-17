import { Field } from 'formik';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function BasicAutocompleteField({ name, options, getOptionLabel, label }) {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const currentValue =
          options.find((option) => option.title === field.value) || null;

        return (
          <Autocomplete
            disablePortal
            fullWidth
            getOptionLabel={getOptionLabel}
            id={`${name}-select`}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                error={form.touched[name] && Boolean(form.errors[name])}
                helperText={form.touched[name] && form.errors[name]}
                label={label}
              />
            )}
            value={currentValue}
            onChange={(event, value) => {
              form.setFieldValue(name, value ? value.title : '');
            }}
          />
        );
      }}
    </Field>
  );
}

export default BasicAutocompleteField;
