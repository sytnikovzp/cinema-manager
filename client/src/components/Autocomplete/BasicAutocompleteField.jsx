import PropTypes from 'prop-types';
import { Field } from 'formik';
// =============================================
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const BasicAutocompleteField = ({ name, options, getOptionLabel, label }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const currentValue =
          options.find((option) => option.title === field.value) || null;

        return (
          <Autocomplete
            disablePortal
            id={`${name}-select`}
            options={options}
            getOptionLabel={getOptionLabel}
            fullWidth
            value={currentValue}
            onChange={(event, value) => {
              form.setFieldValue(name, value ? value.title : '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={form.touched[name] && Boolean(form.errors[name])}
                helperText={form.touched[name] && form.errors[name]}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

BasicAutocompleteField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default BasicAutocompleteField;
