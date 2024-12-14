
import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { Invoice } from '~/schema/invoice';

const generateHtml = (invoice: Invoice, getTotal, getTax, getSubTotal) => {
  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice Summary</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f3f3;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      margin-bottom: 20px;
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 150px;
      height: auto;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #333;
    }
    .header .sub-header {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      text-decoration: underline;
      margin-bottom: 10px;
    }
    .info p {
      margin: 5px 0;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .items-table th, .items-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .items-table th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
    .summary {
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .button-container {
      text-align: center;
    }
    .button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>

<div class="container">
  <!-- Logo Section -->
<!--  <div class="logo">-->
<!--    <img src="your-logo-url-here.png" alt="Company Logo">-->
<!--  </div>-->

  <!-- Header -->
  <div class="header">
    <h1>Invoice ${invoice.invoiceInfo.invoiceNumber}</h1>
    <div class="sub-header">
      <div>
        <p><strong>Date:</strong> ${new Date(invoice.invoiceInfo.date).toLocaleDateString()
  }</p>
      </div>
      <div>
        <p><strong>Due Date:</strong> ${new Date(invoice.invoiceInfo.dueDate).toLocaleDateString()
  }</p>
      </div>
    </div>
  </div>

  <!-- Sender Information -->
  <div class="section">
    <h2 class="section-title">Sender Information</h2>
    <div class="info">
      <p><strong>Name:</strong> ${invoice.senderInfo.name}</p>
      <p><strong>Address:</strong> ${invoice.senderInfo.address}</p>
      <p><strong>Email:</strong> ${invoice.senderInfo.email}</p>
      <p><strong>Tax ID:</strong> ${invoice.senderInfo.taxId}</p>
    </div>
  </div>

  <!-- Recipient Information -->
  <div class="section">
    <h2 class="section-title">Recipient Information</h2>
    <div class="info">
      <p><strong>Name:</strong> ${invoice.recipientInfo.name}</p>
      <p><strong>Address:</strong> ${invoice.recipientInfo.address}</p>
      <p><strong>Email:</strong> ${invoice.recipientInfo.email}</p>
      <p><strong>Tax ID:</strong>${invoice.recipientInfo.taxId}</p>
    </div>
  </div>

  <!-- Items Table -->
  <div class="section">
    <h2 class="section-title">Items</h2>
    <table class="items-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
     ${invoice.items.map(
       (item) => `
           <tr>
      <td>${item.name}</td>
  <td>$${item.price}</td>
  <td>${item.quantity}</td>
  <td>$${item.price * item.quantity}</td>
  </tr>
     `
     )}
   
  
      </tbody>
    </table>
  </div>

  <!-- Summary -->
  <div class="section summary">
    <div class="summary-row">
      <p><strong>Subtotal:</strong></p>
      <p>${getSubTotal}</p>
    </div>
    <div class="summary-row">
      <p><strong>Tax (10%):</strong></p>
      <p>${getTax}</p>
    </div>
    <div class="summary-row">
      <p><strong>Total:</strong></p>
      <p>${getTotal}</p>
    </div>
  </div>



</body>
</html>


`;
  return html;
};

export const generateInvoicePDF = async (invoice: Invoice,getTotal, getTax, getSubTotal) => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  const { uri } = await printToFileAsync({ html: generateHtml(invoice, getTotal, getTax, getSubTotal) });
  const permanentUri = FileSystem.documentDirectory + 'invoice.pdf';
  await FileSystem.moveAsync({
    from: uri,
    to: permanentUri,
  });
  console.log('File has been saved to:', uri);
  await shareAsync(permanentUri, { UTI: '.pdf', mimeType: 'application/pdf' });
};
