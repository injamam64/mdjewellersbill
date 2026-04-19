document.getElementById('invoice-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Get Values with precise decimals
    const weight = parseFloat(document.getElementById('itemWeight').value);
    const rate = parseFloat(document.getElementById('itemRate').value);
    const making = parseFloat(document.getElementById('itemMaking').value);
    const hallmark = parseFloat(document.getElementById('hallmarkCharges').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    // 2. Calculations
    const metalValue = weight * rate;
    const taxable = metalValue + making;
    
    // GST 1.5% each
    const cgst = taxable * 0.015;
    const sgst = taxable * 0.015;
    const rowTotal = taxable + cgst + sgst;

    // Making GST 5% (as per your bill layout)
    const makingGst = making * 0.05;
    
    const grandTotal = rowTotal + hallmark + makingGst;
    const roundedTotal = Math.round(grandTotal);
    const roundOff = (roundedTotal - grandTotal).toFixed(2);
    const netReceivable = roundedTotal - discount;

    // 3. Fill Bill
    document.getElementById('billBuyerName').textContent = document.getElementById('buyerName').value;
    document.getElementById('billBuyerAddress').textContent = document.getElementById('buyerAddress').value;
    document.getElementById('billBuyerGSTIN').textContent = document.getElementById('buyerGSTIN').value;
    document.getElementById('billOrderDate').textContent = document.getElementById('orderDate').value;
    document.getElementById('billDeliveryDate').textContent = document.getElementById('deliveryDate').value;

    // Table Row
    document.getElementById('billItemDesc').textContent = document.getElementById('itemDesc').value;
    document.getElementById('billItemHUID').textContent = document.getElementById('itemHUID').value;
    document.getElementById('billItemPurity').textContent = document.getElementById('itemPurity').value;
    document.getElementById('billItemWeight').textContent = weight.toFixed(3); // Fixes the 1.997 issue
    document.getElementById('billItemRate').textContent = rate.toFixed(2);
    document.getElementById('billItemMaking').textContent = making.toFixed(2);
    document.getElementById('billItemCGST').textContent = cgst.toFixed(2);
    document.getElementById('billItemSGST').textContent = sgst.toFixed(2);
    document.getElementById('billItemMetalValue').textContent = metalValue.toFixed(2);
    document.getElementById('billItemTotalAmount').textContent = rowTotal.toFixed(2);

    // Summary
    document.getElementById('billSummaryTotal').textContent = rowTotal.toFixed(2);
    document.getElementById('billSummaryHallmark').textContent = hallmark.toFixed(2);
    document.getElementById('billSummaryMakingGST').textContent = makingGst.toFixed(2);
    document.getElementById('billSummaryRoundOff').textContent = roundOff;
    document.getElementById('billSummaryFinalTotal').textContent = roundedTotal.toFixed(2);
    document.getElementById('billSummaryDiscount').textContent = discount.toFixed(2);
    document.getElementById('billSummaryNetAmt').textContent = netReceivable.toFixed(2);

    // Words
    document.getElementById('billAmountWords').textContent = numberToWords(netReceivable) + " ONLY";

    // 4. Print
    setTimeout(() => { window.print(); }, 200);
});

function numberToWords(amount) {
    const words = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
    const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
    
    if (amount === 0) return "ZERO";
    
    function convert(n) {
        if (n < 20) return words[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + words[n % 10] : "");
        if (n < 1000) return words[Math.floor(n / 100)] + " HUNDRED" + (n % 100 !== 0 ? " AND " + convert(n % 100) : "");
        if (n < 100000) return convert(Math.floor(n / 1000)) + " THOUSAND" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
        return "";
    }
    return convert(Math.floor(amount)) + " RUPEES";
}