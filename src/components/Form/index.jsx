import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import states from '../../__mocks__/states';

function Form() {
  return (
    <div className="p-4 border-bottom">
      <h5>Informações do comprador</h5>
      <form className="d-flex flex-column gap-3 mt-4">
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Nome Completo" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="CPF" variant="outlined" size="small" />
          <TextField type="email" id="outlined-basic" className="flex-grow-1" label="Email" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Telefone" variant="outlined" size="small" />
        </div>
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className='flex-grow-2' label="CEP" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Endereço" variant="outlined" size="small" />
        </div>
        <div className="d-flex flex-column flex-md-row gap-3">
          <TextField type="text" id="outlined-basic" className='flex-grow-1' label="Complemento" variant="outlined" size="small" />
          <TextField type="number" id="outlined-basic" className="flex-grow-2" label="Número" variant="outlined" size="small" />
          <TextField type="text" id="outlined-basic" className="flex-grow-1" label="Cidade" variant="outlined" size="small" />
          <TextField
            id="outlined-select-currency"
            select  
            style={{ width: '200px' }}
            label="Estado"
            size="small"
          >
            {states.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </form>
    </div>
  )
}

export default Form