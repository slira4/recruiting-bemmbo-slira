import { useEffect } from 'react';
import InvoiceTable from './InvoiceTable';
import './App.css';

const API_URL = 'recruiting.api.bemmbo.com/invoices/pending/';

const DATA =
  [
    {
        "id": "inv_MRlj0lt95XyQjvPY",
        "amount": 40000000,
        "organization_id": "piedpiper",
        "currency": "CLP",
        "type": "received"
    },
    {
        "id": "inv_KedI7Yt22XM64129",
        "amount": 16000,
        "currency": "USD",
        "organization_id": "piedpiper",
        "type": "received"
    },
    {
        "id": "inv_QerT7Yt22XM64MN3",
        "amount": 4000000,
        "currency": "CLP",
        "organization_id": "piedpiper",
        "type": "credit_note",
        "reference": "inv_KedI7Yt22XM64129"
    },
    {
        "id": "inv_012mGPt6Vb2w49GR",
        "amount": 800,
        "currency": "USD",
        "organization_id": "piedpiper",
        "type": "credit_note",
        "reference": "inv_KedI7Yt22XM64129"
    },
    {
        "id": "inv_nDAprkt7D0LKjkE2",
        "amount": 80000,
        "currency": "USD",
        "organization_id": "octopus",
        "type": "received"
    },
    {
        "id": "inv_JitErYt22XM64MN3",
        "amount": 40000,
        "currency": "CLP",
        "organization_id": "octopus",
        "type": "credit_note",
        "reference": "inv_nDAprkt7D0LKjkE2"
    }
  ];

const App = () => {
  const searchBills = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    console.log(data)
  }
  
  useEffect(() => {
    searchBills();
  }, []);

  return (
    <div className="App">
      <InvoiceTable data={DATA}/>
      
    </div>
  );
}

export default App;
