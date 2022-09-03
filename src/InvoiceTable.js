import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InvoiceTable = ({data}) => {
  const [creditNote, setCreditNote] = useState('');
  const [selectedCreditNote, setSelectedCreditNote] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCreditNote('');
    setSelectedCreditNote('');
  }
  let receiveds = [];
  let creditNotes = [];
  data.forEach((element, i) => {
    let clpAmount = element.currency === 'CLP' ? element.amount : element.amount*800; 
    let usdAmount = element.currency === 'USD' ? element.amount : element.amount/800; 
    if (element.type === "received") {
      let parseData = {
        "nid" : `inv_${i}`,
        "id": element.id,
        "organization_id": element.organization_id,
        "clpAmount": `$ ${clpAmount} CLP`,
        "usdAmount": `$ ${usdAmount} USD`,
        "type": "Recibida"
      };
      receiveds.push(parseData)
    } else if (element.type === "credit_note") {
      let parseData = {
        "nid" : `inv_${i}`,
        "id": element.id,
        "organization_id": element.organization_id,
        "clpAmount": `$ ${clpAmount} CLP`,
        "usdAmount": `$ ${usdAmount} USD`,
        "type": "Credit Note",
        "reference": element.reference
      };
      creditNotes.push(parseData);
    }})
  
  


  return (
    <div>
      <div>
        <Typography id="invoice-table-title" variant="h4" component="h2">
          Seleccionar Factura Recibida
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 1000, ml: 55, my: 3 }} aria-label="simple table">
            <TableBody>
              {receiveds.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <input 
                      onClick={() => setCreditNote(() => row.id)}
                      type="radio" 
                      value="Checked" 
                      checked={creditNote === row.id ? true : undefined}
                      name={row.id} 
                    /> 
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.nid}
                  </TableCell>
                  <TableCell align="left">{row.organization_id}</TableCell>
                  <TableCell align="left">{row.clpAmount} ({row.usdAmount})</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
      {creditNote ? (
        <Typography id="credit-note-table-title" variant="h4" component="h2">
          Seleccionar Nota de Crédito
        </Typography>
      ) : null }
      <TableContainer>
          <Table sx={{ maxWidth: 1000, ml: 55, my: 3 }} aria-label="simple table">
            <TableBody>
              {creditNotes.map((row, i) => {
                if (row.reference === creditNote) {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">
                        <input 
                          onClick={() => setSelectedCreditNote(() => row.id)}
                          type="radio" 
                          value="Checked" 
                          name={row.id} 
                        /> 
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.nid}
                      </TableCell>
                      <TableCell align="left">{row.organization_id}</TableCell>
                      <TableCell align="left">{row.clpAmount} ({row.usdAmount})</TableCell>
                      <TableCell align="left">{row.reference}</TableCell>
                    </TableRow>
                  )
                }}
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        {selectedCreditNote ? (
          <Button onClick={handleOpen}>
            Asignar
          </Button>
        ) : null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nota de Crédito Asignada
            </Typography>
            <Button onClick={handleClose}>
              Seguir asignando
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
    
  );   
}

export default InvoiceTable; 